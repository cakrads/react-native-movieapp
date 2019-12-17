import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import globalStyle from '../../theme/style';

const deviceWidth = Dimensions.get('window').width;

const ListsCard = props => {
  const Card = ({data}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            props.clickAction(data.id);
          }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <Text style={styles.titleCard}>{data.title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={props.data}
      renderItem={({item}) => <Card data={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={{marginBottom: 16}}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: deviceWidth - globalStyle.container.padding,
    marginBottom: 20,
  },
  titleCard: {...globalStyle.titleCard},
  cardImage: {
    height: 170,
    borderRadius: globalStyle.borderRadius,
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ListsCard;
