import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const dynamicStyles = (selected: boolean) =>
  StyleSheet.create({
    main_box: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color?.White_Color,
      width: '97%',
      height: scale(90),
      alignSelf: 'center',
      marginVertical: scale(4),
      paddingHorizontal: scale(7),
      borderRadius: scale(7),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
      borderColor: selected ? Color?.Primary_Color : '',
      borderWidth: selected ? scale(1) : 0,
    },
    time_txt: {
      fontSize: scale(10),
      color: selected ? Color.Primary_Color : Color?.Grey_Color,
      fontWeight: '400',
      marginVertical: scale(2),
    },
  });

const styles = StyleSheet.create({
  list_Main: {
    width: '98%',
    marginHorizontal: '1%',
    height: '100%',
    marginTop: scale(20),
  },
  list_Content: {
    paddingBottom: scale(100),
  },
  img: {
    width: scale(65),
    height: scale(70),
    borderRadius: scale(12),
  },
  name_txt: {
    fontSize: scale(12),
    color: Color?.Black_Color,
    fontWeight: 'bold',
  },

  status_txt: {
    fontSize: scale(12),
    color: Color?.Grey_Color,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  detail_box: {
    marginLeft: scale(18),
  },
  empty_Con: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empaty_Label: {
    color: Color.Black_Color,
    marginTop: scale(200),
  },
});

export {dynamicStyles, styles};
const useStyles = {
  dynamicStyles,
  styles,
};

export default useStyles;
