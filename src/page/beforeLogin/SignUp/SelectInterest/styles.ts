import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const dynamicStyles = (active: boolean) =>
  StyleSheet.create({
    txt_style: {
      color: active ? Color?.Primary_Color : Color?.Grey_Color,
      fontSize: active ? scale(14) : scale(13),
      opacity: active ? 1 : 0.8,
    },
    roundView: {
      borderRadius: scale(20),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(9),
      paddingVertical: verticalScale(6),
      marginHorizontal: scale(5),
      marginVertical: verticalScale(3),
      borderWidth: active ? scale(1) : scale(0.4),
      borderColor: active ? Color?.Primary_Color : Color?.Grey_Color,
    },
  });

export const styles = StyleSheet.create({
  txt: {
    color: Color?.Black_Color,
    marginTop: verticalScale(17),
    marginBottom: verticalScale(17),
    alignSelf: 'center',
    opacity: 0.5,
    fontSize: scale(12),
  },
  itemWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  modal_outerview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_innerView: {
    height: verticalScale(450),
    width: scale(335),
    backgroundColor: Color?.White_Color,
    borderRadius: scale(7),
    alignItems: 'center',
  },
  img: {
    width: scale(300),
    height: verticalScale(300),
  },
  big_txt: {
    fontSize: scale(30),
    color: Color?.Primary_Color,
    alignSelf: 'center',
    fontWeight: '700',
  },
  small_txt: {
    fontSize: scale(16),
    color: Color?.Grey_Color,
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: verticalScale(10),
  },
});

const Styles = {
  styles,
  dynamicStyles,
};

export default Styles;
