import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import globalStyle from './../../theme/style';

const deviceWidth = Dimensions.get('window').width;

const HorizontalCard = props => {
  const Card = ({data}) => {
    // console.log('data', data);
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
          }}
          style={styles.cardImage}
        />
        <Text style={styles.titleCard}>{data.title}</Text>
      </View>
    );
  };

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
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
    width: deviceWidth - deviceWidth * (30 / 100),
  },
  titleCard: {...globalStyle.titleCard},
  cardImage: {
    height: 150,
    borderRadius: globalStyle.borderRadius,
    marginRight: 10,
    marginBottom: 5,
  },
});

export default HorizontalCard;
