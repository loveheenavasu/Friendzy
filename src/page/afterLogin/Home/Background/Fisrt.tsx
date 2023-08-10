import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../../../util/Color';
import FastImage from 'react-native-fast-image';
import Icon from '../../../../util/Icon';

interface Props {
  show?: boolean;
}
const First: FC<Props> = ({show}) => {
  return (
    <View style={styles.main}>
      {show ? (
        <View style={styles.f_Child}>
          {/* <FastImage
            style={styles.f_Icon}
            source={Icon.TestIcon}
            resizeMode="contain"
          /> */}
          <View style={styles.dot} />
          <View style={styles.f_Second_Con}>
            <FastImage
              style={styles.f_Second_Icon}
              tintColor={Color.White_Color}
              source={Icon.TabIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View style={styles.s_Con}>
          <FastImage
            style={styles.s_Icon}
            resizeMode={FastImage.resizeMode.contain}
            source={Icon.TabIcon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: scale(120),
    height: scale(80),
    backgroundColor: Color.Second_Primary,
  },
  f_Child: {
    width: '100%',
    height: scale(80),
  },
  f_Icon: {
    width: scale(110),
    height: scale(89),
    backgroundColor: '#FFF',
    position: 'absolute',
    top: scale(-35),
  },
  f_Second_Con: {
    width: '100%',
    height: scale(80),
    marginTop: scale(16),
    backgroundColor: Color.Second_Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  f_Second_Icon: {
    width: scale(20),
    height: scale(20),
    marginTop: scale(-40),
  },
  s_Con: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_Icon: {
    width: scale(20),
    height: scale(20),
    marginTop: scale(-20),
  },
  dot: {
    position: 'absolute',
    width: scale(7),
    height: scale(7),
    borderRadius: scale(3.5),
    backgroundColor: Color.Second_Primary,
    alignSelf: 'center',
  },
});

export default First;
