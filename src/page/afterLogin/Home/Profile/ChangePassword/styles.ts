import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
    paddingHorizontal: scale(10),
  },
  img: {
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  error_view: {
    paddingVertical: scale(8),
    backgroundColor: Color?.Error_View_Color,
    opacity: 0.5,
    borderRadius: scale(17),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  errorTxt: {
    color: Color?.Error_Color,
    fontSize: scale(9),
    fontWeight: '500',
    marginLeft: scale(10),
  },
  errorLogo: {
    width: scale(12),
    height: scale(12),
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
  password_Label: {
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  create_Password_Label: {
    marginLeft: scale(10),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  create_P_Star: {
    marginTop: verticalScale(20),
  },
});

export default styles;
