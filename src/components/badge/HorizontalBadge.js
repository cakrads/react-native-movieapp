import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import globalStyle from './../../theme/style';
import Badge from './Badge';

const HorizontalBadge = props => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={props.data}
      renderItem={({item}) => (
        <Badge
          data={item}
          bgColor={globalStyle.light}
          textColor={globalStyle.black}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      style={{marginBottom: 16}}
    />
  );
};

const styles = StyleSheet.create({});

export default HorizontalBadge;
