import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.White_Color,
    flex: 1,
    padding: scale(15),
  },
  name: {
    fontSize: scale(24),
    color: Color.Black_Color,
  },
  slide: {
    width: '100%',
    height: scale(300),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginVertical: moderateScale(3),
    flexWrap:'wrap'
  },
  flagImg: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6),
  },
  bioView: {
    backgroundColor: Color.LIGHT_GREY,
    padding: scale(10),
    marginTop: scale(10),
    borderRadius: scale(10),
    elevation: scale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  blackText:{
    color:Color.Black_Color,
    marginTop:scale(10),
    fontSize:scale(16),
    textDecorationLine:'underline'
  },
  interestView:{
    flexDirection: 'row',
    margin: moderateScale(3),
    flexWrap:'wrap'
  },
  bioItem:{
    backgroundColor: Color.LIGHT_GREY,
    padding: scale(10),
    marginVertical: scale(5),
    borderRadius: scale(10),
    elevation: scale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    marginRight:scale(10)
  }
});
