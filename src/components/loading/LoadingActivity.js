import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import globalStyle from './../../theme/style';

const LoadingIndicator = props => {
  const color = props.color ? props.color : globalStyle.primary;
  const size = props.size ? props.size : 'large';
  const bg = props.bg
    ? size == 'large'
      ? styles.loadingBgL
      : styles.loadingBgS
    : [];
  return (
    <View style={[styles.container, styles.horizontal, bg]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
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
  loadingBgS: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    width: 40,
    ...shadow,
  },
  loadingBgL: {
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 10,
    width: 60,
  },
});

LoadingIndicator.defaultProps = {
  color: globalStyle.primary,
  size: 'large',
  bg: false,
};

LoadingIndicator.PropTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.bool,
};

export default LoadingIndicator;
