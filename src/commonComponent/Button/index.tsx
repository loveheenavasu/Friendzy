import React, {FC} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../util/Color';
import Label from '../Label';

interface Props {
  buttonStyle?: ViewStyle;
  title: string;
  textStyle?: TextStyle;
  onClick?: () => void;
}

const Button: FC<Props>  = ({buttonStyle, title, textStyle, onClick}) => {
  return (
    <TouchableOpacity style={[styles.main, buttonStyle]} onPress={onClick}>
      <Label textStyle={textStyle} title={title} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: scale(45),
    borderRadius: scale(23),
    backgroundColor: Color.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
});

export default Button;
