import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {withNavigation} from 'react-navigation';

const DetailMovieScreen = props => {
  // console.log("DetailMovieScreen", props.navigation.getParam('data'))
  let movieID = props.navigation.getParam('data');

  return (
    <SafeAreaView>
      <View>
        <Text>DetailMovieScreen. movieID: {movieID}</Text>
      </View>
    </SafeAreaView>
  );
};

export default withNavigation(DetailMovieScreen);
