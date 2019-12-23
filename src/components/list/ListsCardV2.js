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
import PropTypes from 'prop-types';

import globalStyle from '../../theme/style';

const deviceWidth = Dimensions.get('window').width;

const ListsCardV2 = props => {
  const ItemList = ({data}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            props.clickAction(data.id);
          }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
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
      numColumns={'2'}
      data={props.data}
      renderItem={({item}) => <ItemList data={item} />}
      keyExtractor={(item, index) => index.toString()}
      style={{marginBottom: 16}}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    width: deviceWidth / 2,
    marginBottom: 20,
  },
  titleCard: {...globalStyle.titleCard},
  cardImage: {
    height: 270,
    borderRadius: globalStyle.borderRadius,
    marginRight: 10,
    marginBottom: 5,
  },
});

ListsCardV2.PropTypes = {
  data: PropTypes.object,
};

export default ListsCardV2;
