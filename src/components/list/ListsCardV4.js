import React from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import GlobalStyle from '../../theme/style';
import {dateFormater} from './../../helpers/date';
import {genreByID} from './../../store/actions/movie';

const deviceWidth = Dimensions.get('window').width;

const ListsCardV4 = props => {
  const dispatch = useDispatch();

  const getGenre = genreID => {
    return dispatch(genreByID(genreID));
  };

  const ItemList = ({data, index}) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
          }}
          style={styles.cardImage}>
          <View style={styles.bottomCard}>
            <TouchableOpacity
              onPress={() => {
                props.clickAction(data.id);
              }}>
              <Text style={styles.titleCard} numberOfLines={1}>
                {data.title}
              </Text>
            </TouchableOpacity>
            <View style={styles.additionalData}>
              <Text style={styles.additionalDataText}>
                {dateFormater('simple', new Date(data.release_date))}
              </Text>
              <Text style={styles.additionalDataText}>
                {data.vote_average == 0 ? '-' : data.vote_average}
              </Text>
              <Text>{getGenre(data.genre_ids[0])}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <FlatList
      numColumns={'2'}
      data={props.data}
      renderItem={({item, index}) => <ItemList data={item} index={index} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: deviceWidth / 2 - 17,
    marginBottom: 20,
    overflow: 'hidden',
    marginRight: 9,
    marginLeft: 2,
    height: 270,
    borderRadius: GlobalStyle.borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleCard: {
    ...GlobalStyle.titleCard,
    marginBottom: 4,
  },
  cardImage: {
    marginRight: 10,
    marginBottom: 5,
    width: '100%',
    height: '100%',
  },
  bottomCard: {
    backgroundColor: '#fff',
    height: 83,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    padding: 7,
  },
  additionalData: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  additionalDataText: {
    color: GlobalStyle.gray,
  },
});

ListsCardV4.PropTypes = {
  data: PropTypes.object,
};

export default ListsCardV4;
