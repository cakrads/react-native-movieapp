import React from 'react';
import {View, Dimensions} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const LoadingSkeleton = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const widthResp = percentage => {
    return (percentage / 100) * SCREEN_WIDTH;
  };

  return (
    <View style={layout.frame}>
      <ContentLoader width={SCREEN_WIDTH - 32}>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
        <Rect x="0" y="30" rx="4" ry="4" width="70%" height="20" />

        <Rect x="0" y="60" rx="4" ry="4" width="20%" height="15" />
        <Rect x={widthResp(30)} y="60" rx="4" ry="4" width="20%" height="15" />
      </ContentLoader>
    </View>
  );
};

export default LoadingSkeleton;
