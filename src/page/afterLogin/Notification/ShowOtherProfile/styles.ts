import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  wrapper: {},
  banner_Con: {
    width: '100%',
    height: '56%',
    backgroundColor: Color.White_Color,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  profile_Con: {
    height: '100%',
    width: '100%',
  },
  back_Con: {
    position: 'absolute',
    top: scale(20),
    left: scale(20),
    backgroundColor: Color.White_Color,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_Child: {
    width: '100%',
    height: '44%',
    backgroundColor: Color.White_Color,
  },
  bottom_Child_Con: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    padding: scale(20),
  },
  name_Label: {
    fontWeight: 'bold',
    color: Color.Black_Color,
    fontSize: scale(16),
    marginTop: scale(10),
  },
  location_Icon: {
    marginLeft: scale(-2),
    opacity: 0.9,
  },
  location_Label: {
    color: Color.Black_Color,
    opacity: 0.9,
  },
  active_Con: {
    width: scale(110),
    height: scale(30),
    borderWidth: scale(1),
    borderColor: Color.Primary_Color,
    borderRadius: scale(7),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F9DCED',
    marginBottom: scale(10),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(4),
    backgroundColor: 'red',
  },
  active_Label: {
    color: Color.White_Color,
    fontWeight: 'normal',
    fontSize: scale(13),
  },
  des_Title: {
    color: Color.Black_Color,
    fontWeight: '500',
  },
  des_Label: {
    color: Color.Grey_Color,
    fontSize: scale(12.5),
    marginVertical: scale(5),
  },
});

export default styles;
