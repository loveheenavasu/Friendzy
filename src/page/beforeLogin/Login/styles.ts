import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../../util/Color';

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    marginTop: verticalScale(50),
    backgroundColor: '#fff',
    paddingHorizontal: scale(5),
  },
  main: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    backgroundColor: Color.White_Color,
  },
  main_Second: {
    width: '100%',
    marginTop: verticalScale(30),
  },
  scroll: {
    paddingBottom: verticalScale(200),
  },
  heading_Txt: {
    fontSize: scale(20),
    color: Color?.Black_Color,
    fontWeight: 'bold',
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
    marginHorizontal: '3%',
    width: '94%',
    justifyContent: 'space-between',
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
    fontSize: scale(14),
    color: Color?.White_Color,
  },
  signUp_txtStyle: {
    fontWeight: '700',
    fontSize: scale(14),
    color: Color?.Black_Color,
  },
  signUp_btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(30),
    marginTop: verticalScale(14),
    backgroundColor: Color?.Light_Primary,
    // opacity: 0.3,
  },
  normalTxt: {
    fontSize: scale(10),
    alignSelf: 'center',
    color: Color?.Grey_Color,
    marginVertical: verticalScale(20),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  googleApple_Btn: {
    width: '46%',
    paddingVertical: scale(18),
    borderRadius: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color?.Light_white,
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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Color.Light_Primary,
    paddingVertical: scale(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: scale(32),
    paddingLeft: scale(15),
    marginTop: verticalScale(5),
    opacity: 0.5,
  },
  errorTxt: {
    color: Color?.Red_Color,
    fontSize: scale(9),
    fontWeight: '500',
    marginLeft: scale(10),
  },
  errorLogo: {
    width: scale(12),
    height: scale(12),
  },
  email_Label: {
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  password_Label: {
    marginTop: verticalScale(20),
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  password_Star: {
    marginTop: verticalScale(20),
  },
  check_Con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
