import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_Main: {
    width: '90%',
    marginHorizontal: '5%',
    height: scale(330),
    backgroundColor: Color.White_Color,
    borderRadius: scale(10),
  },
  inner_Child: {
    padding: scale(15),
    width: '100%',
    height: '100%',
  },
  profile_Pic: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(10),
    borderColor: Color.LIGHT_GREY,
    borderWidth: scale(0.6),
    marginBottom: scale(16),
  },
  name_Label: {
    fontWeight: 'bold',
    color: Color.Black_Color,
    fontSize: scale(16),
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
    // borderColor: Color.Green_Color,
    borderRadius: scale(7),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#F9DCED',
    backgroundColor:"#FFF",
    marginBottom: scale(10),
  },
  non_Active_Con: {
    width: scale(80),
    height: scale(30),
    borderWidth: scale(1),
    borderColor: Color.Primary_Color,
    // borderColor: Color.Green_Color,
    borderRadius: scale(7),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F9DCED',
    // backgroundColor:"#FFF",
    marginBottom: scale(10),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(4),
    backgroundColor: Color.Green_Color,
  },
  dot2: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(4),
    backgroundColor: "red",
  },
  active_Label: {
    color: Color.Green_Color,
    fontWeight: 'normal',
    fontSize: scale(13),
  },
 non_Active_Label: {
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
    marginTop: scale(5),
  },
  bottom_B_Con: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(15),
  },
  back_B_Con: {
    width: scale(130),
    height: scale(45),
    borderRadius: scale(25),
    borderColor: Color.Primary_Color,
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  back_Label: {
    color: Color.Primary_Color,
    fontSize: scale(14),
  },
  send_B_Con: {
    width: scale(130),
    height: scale(45),
    borderRadius: scale(25),
    borderColor: Color.Primary_Color,
    borderWidth: scale(1),
    backgroundColor: Color.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_Label: {
    color: Color.White_Color,
    fontSize: scale(14),
  },
});

export default styles;
