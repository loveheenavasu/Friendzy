import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Color from '../../../util/Color';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Icon from '../../../util/Icon';
import CommonStyles from '../../../util/CommonStyles';

const Splash: FC = () => {
  return (
   <FastImage style={CommonStyles.splash3_Con} source={Icon.Splash3} />
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default Splash;
