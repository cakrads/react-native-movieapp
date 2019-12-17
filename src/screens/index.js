import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import DetailMovieScreen from './DetailMovieScreen';
import ListMovieScreen from './ListMovieScreen';

const BackButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.routeBack) {
          props.navigation.navigate(props.routeBack);
        } else {
          props.navigation.goBack();
        }
      }}>
      <Text> &lt; {props.backTitleTxt}</Text>
    </TouchableOpacity>
  );
};

class IconWithBadge extends React.Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    // We want to add badges to home tab icon
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'About') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const DetailMovieNavigation = createStackNavigator({
  DetailMovieScreen: {
    screen: DetailMovieScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <BackButton
          kurma={true}
          navigation={navigation}
          routeBack={'Home'}
          backTitleTxt={'Beranda Mashara'}
        />
      ),
      // headerStyle: {backgroundColor: Colors.kurma_profile_background},
    }),
  },
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      List: ListMovieScreen,
      Home: {screen: HomeScreen},
      About: {screen: AboutScreen},
      Detail: DetailMovieNavigation,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    },
  ),
);
