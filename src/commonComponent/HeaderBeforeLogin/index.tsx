import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from '../../util/Icon';
import FastImage from 'react-native-fast-image';

const HeaderBeforeLogin: FC = () => {
  return (
    <FastImage
      style={styles.main}
      resizeMode="contain"
      source={Icon.AppLogo2}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    width: scale(220),
    height: scale(105),
    marginTop: verticalScale(25),
    alignSelf: 'center',
  },
});

export default HeaderBeforeLogin;
