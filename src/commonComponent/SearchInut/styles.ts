import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Color from '../../util/Color';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingHorizontal: scale(10),
    height: scale(45),
    backgroundColor: Color?.Light_white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: scale(10),
  },
  input: {
    width: '80%',
    fontSize: scale(12),
    fontWeight: '400',
  },
});

export default styles;
