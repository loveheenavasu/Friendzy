import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../util/Color';
interface Props {
  onPress?: (txt: any) => void;
  name: string;
  txtStyle?: TextStyle;
  btnStyle?: ViewStyle | ViewStyle[];
  rightLogo?: string;
  disabled?: boolean;
}

const CustomButton = (props: Props) => {
  const {name, onPress, btnStyle, txtStyle, rightLogo, disabled} = props;
  const mergedBtnStyles = Array.isArray(btnStyle)
    ? Object.assign({}, ...btnStyle)
    : btnStyle;

  return (
    <TouchableOpacity
      disabled={disabled ? disabled : false}
      onPress={onPress}
      style={[styles.btn, mergedBtnStyles]} // Use the merged styles here
      >
      {rightLogo && (
        <Image
          source={rightLogo}
          resizeMode="contain"
          style={styles.rightLogoStyle}
        />
      )}
      <Text style={[styles.txt, {...txtStyle}]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: Color?.Button_Color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  txt: {
    color: Color?.White_Color,
    fontSize: scale(16),
  },
  rightLogoStyle: {
    width: scale(13),
    height: scale(13),
  },
});
