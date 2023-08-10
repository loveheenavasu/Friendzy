import React, {FC} from 'react';
import {
  TransformsStyle,
  ShadowStyleIOS,
  FlexStyle,
  ImageRequireSource,
  StyleSheet,
} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';
import {Color} from '@src/util';
const Image = createImageProgress(FastImage);
interface Props {
  styles: FlexStyle | TransformsStyle | ShadowStyleIOS | ImageStyle;
  uri: ImageRequireSource | number | any;
  resizeMode: 'cover' | 'contain';
}

const CustomImage: FC<Props> = ({styles, uri, resizeMode, ...Props}) => {
  return (
    <Image
      style={styles}
      source={uri}
      indicatorProps={internalStyles.indicateor_Con}
      indicator={Progress.Pie}
      resizeMode={resizeMode}
    />
  );
};

const internalStyles = StyleSheet.create({
  indicateor_Con: {
    size: 80,
    borderWidth: 0,
    color: Color.Second_Primary,
    unfilledColor: 'rgba(200, 200, 200, 0.2)',
  },
});

export default CustomImage;
