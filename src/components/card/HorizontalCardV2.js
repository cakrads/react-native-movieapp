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
import {dateFormater} from './../../helpers/date';

const deviceWidth = Dimensions.get('window').width;

const HorizontalCardV2 = props => {
  const Card = ({data}) => {
    // console.log('data', data);
    return (
      <View style={styles.card}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w200/${data.poster_path}`}}
          style={styles.cardImage}
        />
        <Text style={styles.titleCard} numberOfLines={1}>
          {data.title}
        </Text>
        <View style={styles.bottomCard}>
          <Text>{dateFormater('simple', new Date(data.release_date))}</Text>
          <Text>{data.vote_average == 0 ? '-' : data.vote_average}</Text>
        </View>
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
    width: 170,
  },
  titleCard: {...globalStyle.titleCardV2},
  cardImage: {
    height: 255,
    borderRadius: globalStyle.borderRadius,
    marginRight: 10,
    marginBottom: 5,
  },
  bottomCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '92%',
  },
});

export default HorizontalCardV2;
