import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import globalStyle from './../../theme/style';

const LoadingIndicator = props => {
  const color = props.color ? props.color : globalStyle.primary;
  const size = props.size ? props.size : 'large';
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingIndicator;
