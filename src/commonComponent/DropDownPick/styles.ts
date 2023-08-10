import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
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
  label_txt: {
    fontSize: scale(14),
    fontWeight: '400',
    color: Color?.Black_Color,
    marginLeft: scale(7),
    marginVertical: verticalScale(10),
  },
});

export default styles;
