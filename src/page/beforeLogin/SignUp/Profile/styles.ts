import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    paddingHorizontal: scale(10),
    backgroundColor: Color.White_Color,
  },
  sub_Main: {
    backgroundColor: Color.White_Color,
    flex: 1,
    paddingHorizontal: scale(4),
  },
  outer_Con: {
    backgroundColor: Color?.Light_white,
    marginBottom: verticalScale(10),
  },
  dropDown_Outer: {
    marginBottom: verticalScale(8),
  },
  formView: {
    marginTop: verticalScale(17),
  },
  field_view: {flexDirection: 'row', alignItems: 'center'},
  field_txt: {
    marginBottom: scale(3),
    marginLeft: scale(17),
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  gender_Label: {
    marginBottom: scale(3),
    marginLeft: scale(-2),
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  star_style: {
    marginBottom: verticalScale(5),
  },
  error_view: {
    paddingVertical: scale(8),
    backgroundColor: Color?.Error_View_Color,
    opacity: 0.5,
    borderRadius: scale(17),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(3),
    paddingHorizontal: scale(10),
  },
  errorTxt: {
    color: Color?.Error_Color,
    fontSize: scale(9),
    fontWeight: '500',
    marginLeft: scale(10),
  },
  errorLogo: {
    width: scale(10),
    height: scale(10),
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(15),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
  dob_txt_style: {
    color: Color?.LIGHT_GREY,
  },
  selected_Date_Label: {
    color: Color?.Black_Color,
    fontSize: scale(13),
  },
  edit: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  email_Edit:{
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.4,
  },
});

export default styles;
