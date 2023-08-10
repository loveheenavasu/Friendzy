import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../../../util/Color';
const styles = StyleSheet.create({
  imgBox: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    alignSelf: 'center',
    backgroundColor: Color?.LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  img: {
    width: scale(116),
    height: scale(116),
    borderRadius: scale(80),
    overflow: 'hidden',
  },
  txt: {
    alignSelf: 'center',
    color: Color?.Red_Color,
    fontSize: scale(13),
    fontWeight: '400',
    marginTop: verticalScale(2),
  },
  nameTxt: {
    alignSelf: 'center',
    color: Color?.Black_Color,
    marginTop: verticalScale(2),
    fontWeight: '600',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: verticalScale(45),
    backgroundColor: Color?.White_Color,
    marginTop: verticalScale(10),
    marginHorizontal: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleTxt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Black_Color,
    opacity: 0.8,
  },
  menuView: {
    marginTop: verticalScale(20),
  },
  change_Con: {
    width: scale(100),
    alignSelf: 'center',
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(15),
  },
});

export default styles;
