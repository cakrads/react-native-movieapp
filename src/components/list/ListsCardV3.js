import React from 'react';
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

const deviceWidth = Dimensions.get('window').width;

const ListsCardV3 = props => {
  const Card = ({data}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            props.clickAction(data.id);
          }}>
          <ImageBackground
            resizeMode="cover"
            style={styles.cardImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`,
            }}>
            <View style={styles.cardOpacity}></View>
            <Text style={styles.titleCard}>{data.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
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
    marginBottom: 20,
    borderRadius: GlobalStyle.borderRadius,
    overflow: 'hidden',
  },
  titleCard: {
    ...GlobalStyle.titleCard,
    color: GlobalStyle.white,
    fontSize: 20,
  },
  cardOpacity: {
    padding: 10,
    height: 170,
    width: '100%',
    backgroundColor: GlobalStyle.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    opacity: 0.2,
    position: "absolute"
  },
  cardImage: {
    height: 170,
    backgroundColor: GlobalStyle.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

ListsCardV3.PropTypes = {
  data: PropTypes.object,
};

export default ListsCardV3;
