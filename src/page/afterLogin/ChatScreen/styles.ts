import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  block_Main: {
    backgroundColor: Color?.White_Color,
    borderRadius: scale(9),
    position: 'absolute',
    paddingHorizontal: scale(10),
    width: scale(100),
    top: scale(50),
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
});

export default styles;
