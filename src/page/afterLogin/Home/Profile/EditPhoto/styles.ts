import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  txt: {
    fontWeight: '400',
    color: Color?.Grey_Color,
    marginTop: verticalScale(17),
    alignSelf: 'center',
    fontSize: scale(12),
  },
  pic: {
    width: scale(100),
    height: scale(140),
    borderRadius: scale(10),
  },
  list_Main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: verticalScale(20),
  },
  list_F_Child:{
    width: scale(100),
    height: scale(140),
    backgroundColor: Color?.LIGHT_GREY,
    borderRadius: scale(10),
    marginRight: scale(10),
    marginTop: scale(10),
  },
  rounded:{
    position: 'absolute',
    right: scale(-8),
    bottom: scale(-5),
    height: scale(30),
    width: scale(30),
    borderRadius: scale(25),
    backgroundColor: Color.Primary_Color,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles;
