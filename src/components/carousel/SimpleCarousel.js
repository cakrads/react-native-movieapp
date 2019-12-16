import React, {Component} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import globalStyle from './../../theme/style';

const MARGIN = 10;
const deviceWidth = Dimensions.get('window').width;
const imageWidth = deviceWidth - 2 * MARGIN;
const FIXED_BAR_WIDTH = 270;
const BAR_SPACE = 10;

export default class SimpleCarousel extends Component {
  numItems = this.props.images.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  render() {
    let imageArray = [];
    let barArray = [];
    this.props.images.forEach((image, i) => {
      // console.log(image, i);
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{
            width: imageWidth,
          }}
        />
      );
      imageArray.push(thisImage);

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [imageWidth * (i - 1), imageWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [{translateX: scrollBarVal}],
              },
            ]}
          />
        </View>
      );
      barArray.push(thisBar);
    });
    return (
      <View
        style={{
          ...styles.container,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: this.animVal}}},
          ])}>
          {imageArray}
        </ScrollView>
        <View style={styles.barContainer}>{barArray}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    margin: MARGIN,
    borderRadius: globalStyle.borderRadius,
    overflow: 'hidden',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 20,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 5,
    borderRadius: 5,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 5,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 5,
  },
});
