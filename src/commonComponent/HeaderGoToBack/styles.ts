import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex:999,
  },
  icon: {
    width: scale(50),
    height: scale(50),
    marginTop: verticalScale(6),
  },
  dots_icon: {
    width: scale(19),
    height: scale(19),
  },
  txtColor: {
    fontWeight: '500',
    fontSize: scale(16),
    color: Color.Black_Color,
    marginLeft: scale(10),
  },
  user_info_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_details: {
    marginLeft: scale(10),
    width: '67%',
  },
  name_text: {
    fontSize: scale(16),
    fontWeight: '400',
    color: Color?.Black_Color,
  },
  active_text: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Grey_Color,
  },
  report_block_box: {
    backgroundColor: Color?.White_Color,
    borderRadius: scale(9),
    position: 'absolute',
    paddingHorizontal: scale(10),
    // paddingVertical: verticalScale(10),
    width: scale(100),
    top: scale(40),
    right: scale(30),
    borderColor: Color.Grey_Color,
    borderWidth: scale(0.2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  row_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(7),
  },
  txt: {
    fontSize: scale(14),
    fontWeight: '500',
    marginLeft: scale(7),
    color: Color?.Grey_Color,
    marginTop: scale(2),
  },
  block_icon: {
    height: verticalScale(15),
    width: scale(15),
  },
  Gline: {
    height: scale(1),
    backgroundColor: Color?.LIGHT_GREY,
  },
  back_Con: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(6),
    backgroundColor: Color.White_Color,
    margin: scale(7),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profile_Con: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(30),
    borderWidth: scale(0.6),
    borderColor: Color.Primary_Color,
  },
  dot_Con: {
    position: 'absolute',
    right: scale(-1),
    height: scale(12),
    width: scale(12),
    borderRadius: scale(10),
  },
});

export default styles;
