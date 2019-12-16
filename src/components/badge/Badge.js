import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyle from './../../theme/style';

const Badge = props => {
  const bgColor = props.bgColor ? {backgroundColor: props.bgColor} : {};
  const textColor = props.textColor ? {color: props.textColor} : {};
  return (
    <View style={{...styles.badge, ...bgColor}}>
      <Text style={{...styles.text, ...textColor}}>{props.data.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 100,
    backgroundColor: globalStyle.primary,
    paddingHorizontal: 13,
    paddingVertical: 5,
    margin: 5,
  },
  text: {
    color: globalStyle.white,
  },
});

export default Badge;
