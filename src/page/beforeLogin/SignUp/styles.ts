import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Color} from '@src/util';

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    marginTop: verticalScale(50),
    backgroundColor: '#fff',
    paddingHorizontal: scale(5),
  },
  main: {
    width: '100%',
    paddingHorizontal: scale(15),
    backgroundColor: Color.White_Color,
  },
  scroll: {
    paddingBottom: verticalScale(200),
  },
  heading_Txt: {
    fontSize: scale(20),
    color: Color?.Black_Color,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  field_view: {flexDirection: 'row', alignItems: 'center'},
  field_txt: {
    color: Color?.Grey_Color,
    marginBottom: scale(3),
    marginLeft: scale(6),
  },
  star_style: {
    color: Color?.Primary_Color,
    marginBottom: verticalScale(5),
  },
  forgot_View: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(14),
  },
  inner_box: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  remember_Txt: {
    fontSize: scale(12),
    color: Color?.Grey_Color,
    marginLeft: scale(5),
  },
  forget_txt: {
    fontWeight: '400',
    fontSize: scale(12),
    color: Color?.Primary_Color,
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(30),
    marginTop: verticalScale(30),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
  signUp_txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.Button_Color,
  },
  signUp_btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    backgroundColor: Color?.Primary_Color,
    opacity: 0.6,
  },
  normalTxt: {
    fontSize: scale(12),
    alignSelf: 'center',
    color: Color?.Grey_Color,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },
  googleApple_Btn: {
    width: '46%',
    paddingVertical: scale(18),
    borderRadius: scale(22),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color?.LIGHT_GREY,
    borderWidth: scale(0.8),
    borderColor: 'rgba(38, 115, 209,0.3)',
  },
  btnTxt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Grey_Color,
    marginLeft: scale(7),
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
  signIn_txt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Primary_Color,
    marginLeft: scale(5),
  },
  header_Label: {
    marginLeft: scale(10),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(5),
  },
  header_Star: {
    marginTop: verticalScale(30),
  },
  password_Label: {
    marginTop: verticalScale(20),
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  conPass_Label: {
    marginTop: verticalScale(20),
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  pass_Star: {
    marginTop: verticalScale(20),
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(12),
    marginTop: verticalScale(10),
  },
});

export default styles;
