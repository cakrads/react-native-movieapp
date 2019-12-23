import React from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

import {examples} from './../components/form/slider';

const SlideScreen = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {examples.map((e, i) => (
            <View key={`slider${i}`}>
              <Text>{e.title}</Text>
              {e.render()}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SlideScreen;
