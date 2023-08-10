import {StyleSheet} from 'react-native';
import Color from './Color';
import {scale, verticalScale} from 'react-native-size-matters';
const CommonStyles = StyleSheet.create({
  main: {
    backgroundColor: Color.White_Color,
    flex: 1,
    paddingHorizontal: scale(8),
    paddingTop: scale(14),
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
  pick_box: {
    paddingLeft: scale(15),
    paddingRight: scale(5),
    borderWidth: scale(0.6),
    width: '100%',
    height: scale(45),
    borderRadius: scale(24),
    borderColor: Color?.LIGHT_GREY,
    backgroundColor: Color?.Light_white,
    marginBottom: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  splash3_Con: {
    width: '100%',
    height: '100%',
    
  },
  field_view: {flexDirection: 'row', alignItems: 'center'},
  field_txt: {
    color: Color?.Grey_Color,
    marginBottom: scale(3),
    marginLeft: scale(6),
    marginTop: scale(-5)
  },
  star_style: {
    color: Color?.Red_Color,
    marginBottom: verticalScale(5),
  },
});

export default CommonStyles;
