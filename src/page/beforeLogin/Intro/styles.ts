import {Dimensions, StyleSheet} from 'react-native';
import Color from '../../../util/Color';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
  },
  intro2_Main: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intro2_Icon: {
    width: scale(300),
    height: scale(300),
  },
  back_Icon: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,
  },
  second_Child: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,
    paddingHorizontal: scale(20),
  },
  title_Con: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  make_Label: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: Color.Black_Color,
  },
  intro_Label: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: Color.Black_Color,
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  friends_Label: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: Color.Primary_Color,
    marginHorizontal: scale(5),
  },
  des_Label: {
    color: Color.Black_Color,
    opacity: 0.3,
    fontWeight: 'normal',
    fontSize: scale(11),
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  interest_Label: {
    color: Color.Black_Color,
    opacity: 0.3,
    fontWeight: 'normal',
    fontSize: scale(11),
    alignSelf: 'center',
  },
  skip_Button: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
    backgroundColor: Color.Second_Primary,
  },
  skip_Label: {
    color: Color.White_Color,
    fontSize: scale(12),
    fontWeight: 'bold',
  },
  next_Button: {
    marginVertical: verticalScale(0),
    backgroundColor: Color.Light_Primary,
  },
  next_Label: {
    color: Color.Black_Color,
    fontSize: scale(12),
    fontWeight: 'bold',
  },
});

export default styles;
