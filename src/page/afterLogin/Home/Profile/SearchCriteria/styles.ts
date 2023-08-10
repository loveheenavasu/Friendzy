import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  label_txt: {
    marginVertical: verticalScale(8),
    marginLeft: scale(11),
    fontSize: scale(13),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  gender_Label: {
    marginLeft: scale(9),
    fontSize: scale(13),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
    marginTop: scale(15),
    marginBottom: scale(2),
  },
  age_Label: {
    marginVertical: verticalScale(15),
    marginLeft: scale(11),
    fontSize: scale(13),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  location_box: {
    backgroundColor: 'red',
    height: verticalScale(30),
    width: scale(40),
  },
  drop_box: {
    width: '100%',
    height: scale(45),
    borderRadius: scale(24),
    color: Color?.Black_Color,
    fontSize: scale(14),
  },
  label_box: {
    height: verticalScale(12),
    width: scale(12),
    borderRadius: scale(4),
    backgroundColor: Color?.Primary_Color,
  },
  btn_box: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    width: '48%',
    paddingVertical: verticalScale(19),
    borderRadius: scale(50)
  },
  google_Edit_Con: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  google_Edit: {
    width: '100%',
    height: scale(45),
    borderRadius: scale(24),
    color: Color?.Black_Color,
    fontSize: scale(14),
    paddingLeft: scale(15),
    alignSelf: 'center',
    borderWidth: scale(1),
    borderColor: Color.LIGHT_GREY,
  },
  dropDown_Outer: {
    height: scale(45),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#FFF',
    marginTop: scale(5),
  },
});

export default styles;
