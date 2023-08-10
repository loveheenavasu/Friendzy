import {StyleSheet} from 'react-native';
import {Color} from '@src/util';
import {scale, verticalScale} from 'react-native-size-matters';

const dynamicStyle = (showBorder: boolean) =>
  StyleSheet.create({
    main_List: {
      width: '97%',
      marginHorizontal: '1.5%',
      height: scale(52),
      backgroundColor: Color.White_Color,
      marginVertical: scale(7),
      borderRadius: scale(10),
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      borderWidth: showBorder ? scale(0.9) : 0,
      borderColor: showBorder ? Color?.Primary_Color : Color?.White_Color,
    },
    inner_circle: {
      width: scale(14),
      height: scale(14),
      borderRadius: scale(7),
      backgroundColor: showBorder ? Color?.Primary_Color : Color.White_Color,
    },
  });

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.White_Color,
    flex: 1,
    paddingHorizontal: scale(8),
  },
  list_Main:{
    marginTop: verticalScale(20),
    paddingBottom: scale(30),
  },
  country_img: {
    width: scale(33),
    height: scale(33),
    borderRadius: scale(20),
    overflow: 'hidden',
    borderWidth: scale(2),
    borderColor: Color.LIGHT_GREY,
  },
  circle: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: Color?.Primary_Color,
    marginRight: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  countryTxt: {
    marginLeft: scale(7),
    color: Color?.Black_Color,
    fontSize: scale(14),
    fontWeight: '500',
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
  f_Child: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  s_Child: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  search_Con:{
    marginTop: verticalScale(10), width:"98%", marginHorizontal:"1%"
  }
});

export {dynamicStyle, styles};

const CustomStyles = {
  dynamicStyle,
  styles,
};

export default CustomStyles;
