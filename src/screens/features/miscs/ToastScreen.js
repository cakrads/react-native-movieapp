import React from 'react';
import {ToastAndroid, View, Text, TouchableOpacity} from 'react-native';
import Toast from './../../../components/toast';

const ToastScreen = () => {
  const showToast = () => {
    Toast();
  };

  const showToast1 = () => {
    // Toast();
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToast2 = () => {
    // Toast();
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToast3 = () => {
    // Toast();
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          showToast();
        }}>
        <Text>Toast </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showToast1();
        }}>
        <Text>Toast 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showToast2();
        }}>
        <Text>Toast 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showToast3();
        }}>
        <Text>Toast 3</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToastScreen;
