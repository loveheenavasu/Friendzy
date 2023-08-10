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
  btnStyle?: ViewStyle;
  rightLogo?:string
}

const CustomButton = (props: Props) => {
  const {name, onPress, btnStyle, txtStyle,rightLogo} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, {...btnStyle}]}>
      {rightLogo && (
       <Image source={rightLogo} resizeMode='contain' style={styles.rightLogoStyle}/>
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
    backgroundColor:Color?.Button_Color,
    alignItems: 'center',
    justifyContent:"center",
    borderRadius: 7,
  },
  txt: {
    color: Color?.White_Color,
    fontSize: scale(16),
  },
  rightLogoStyle:{
    width:scale(13),
    height:scale(13)
  }
});
