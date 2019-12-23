import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, Animated, Dimensions} from 'react-native';
import RootSiblings from 'react-native-root-siblings'
import PropTypes from 'prop-types';

import GlobalStyle from './../../theme/style';

const {height} = Dimensions.get('window');

const ToastComponent = props => {
  const animatedValue = new Animated.Value(height * 0.1 * -1);
  const animatedValueRef = useRef(animatedValue);

  const hideToast = () => {
    setTimeout(() => {
      Animated.timing(animatedValueRef.current, {
        toValue: height * 0.1 * -1,
        duration: 300,
      }).start();
      // console.log("STOP ANIMATIOn")
    }, props.closeDuration);
  };

  const showToast = () => {
    Animated.spring(animatedValueRef.current, {
      toValue: 0,
      duration: 750,
    }).start(() => {
      hideToast();
    });
  };

  useEffect(() => {
    console.log('ToastComponent', props);
    if (props.show) {
      console.log('props.show:', props.show);
      showToast();
    }
  }, []);

  return (
    <Animated.View
      style={{
        ...ToastStyle.frame,
        backgroundColor: props.bgColor,
        transform: [{translateY: animatedValue}],
      }}>
      <Text style={{...styles.toastText, backgroundColor: props.textColor}}>
        {props.toastText}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  frame: {
    height: height * 0.1,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  toastText: {
    color: '#fff',
  },
});

// ToastComponent.defaultProps = {
//   text: 'Weew',
//   bgColor: GlobalStyle.primary,
//   textColor: '#fff',
//   show: true,
//   closeDuration: 2000,
// };

// ToastComponent.PropTypes = {
//   text: propTypes.string,
//   bgColor: propTypes.string,
//   textColor: propTypes.string,
//   show: propTypes.bool,
//   closeDuration: propTypes.number,
// };

let rootSiblings = undefined

const ToastText = () => {
  console.log('aa');
  new RootSiblings(
    <View style={styles.frame} pointerEvents="box-none">
      <Text>WWWWWWWWWW</Text>
    </View>
  );
};

const Toast = () => {
  console.log('Toastw');
  return ToastText();
};

export default Toast;
