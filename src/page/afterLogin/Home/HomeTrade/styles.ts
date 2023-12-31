import {Color} from '@src/util';
import {Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White_Color,
  },
  card: {
    borderRadius: scale(20),
    borderWidth: scale(1),
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? '60%' : '70%',
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  bottom_Con: {
    width: scale(200),
    height: '20%',
    alignSelf: 'center',
    position: 'absolute',
    // bottom: scale(40),
    bottom: '9%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle_Con: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Color.White_Color,
    borderRadius: scale(50),
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
  },
  nope_Label: {
    borderColor: Color.Red_Color,
    color: Color.Red_Color,
    borderWidth: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
  },
  like_Label: {
    borderColor: 'green',
    color: 'green',
    borderWidth: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  wrapper_Nope: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: scale(30),
    marginLeft: scale(-30),
  },
  like_Wrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: scale(30),
    marginLeft: scale(30),
  },
  banner_Icon: {
    width: '100%',
    height: '100%',
    borderRadius: scale(20),
    overflow: 'hidden',
  },
  like_Con: {
    paddingHorizontal: scale(30),
    height: scale(60),
    borderColor: Color.Green_Color,
    borderWidth: scale(2),
    alignSelf: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(260),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  like_Label_Box: {
    color: Color.Green_Color,
    fontWeight: 'bold',
    fontSize: scale(30),
  },
  supper_Like: {
    color: Color.Primary_Color,
    fontWeight: 'bold',
    fontSize: scale(30),
  },
  nope_Con: {
    paddingHorizontal: scale(30),
    height: scale(60),
    borderColor: Color.Red_Color,
    borderWidth: scale(2),
    alignSelf: 'center',
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(260),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  nope_Label_Box: {
    color: Color.Red_Color,
    fontWeight: 'bold',
    fontSize: scale(30),
  },
  empty_Main: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  not_Found: {
    alignSelf: 'center',
    fontSize: scale(16),
    color: Color.Black_Color,
    opacity: 0.7,
  },
  reset_Con: {
    width: scale(100),
    height: scale(45),
    borderRadius: scale(10),
    borderWidth: scale(1),
    marginTop: verticalScale(30),
    borderColor: Color.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset_Label: {
    fontSize: scale(14),
    color: Color.Primary_Color,
  },
  swiper_Main_Con: {
    width: scale(400),
    height: '100%',
  },
  detail_view:{
    position:'absolute',
    bottom:scale(50),
    left:scale(17),
    backgroundColor:"rgba(52,52,52,.2)"
  },
  row_view:{
  flexDirection:'row',
  alignItems:'center'
  },
  card_name:{
    color:Color?.White_Color,
    fontSize:scale(30),
    fontWeight:'700',
    marginLeft:scale(7)
  },
  card_age:{
    color:Color?.White_Color,
    fontSize:scale(32),
    fontWeight:'400',
  },
  location_txt:{
    color:Color?.White_Color,
    fontSize:scale(16),
    fontWeight:'400',
  },
  active_Con: {
    width: scale(110),
    height: scale(30),
    borderWidth: scale(1),
    borderColor: Color.Primary_Color,
    borderRadius: scale(7),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:Color?.White_Color,
    backgroundColor :"rgba(52,52,52,.4)",
    // backgroundColor: Color.Second_Primary,
    // backgroundColor: '#F9DCED',
    // marginBottom: scale(10),
    // marginVertical:scale(7),
    marginTop:scale(8),
    marginLeft:scale(5)
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(4),
    backgroundColor: 'red',
    marginLeft:scale(10)
  },
  active_Label: {
    color: Color.White_Color,
    fontWeight: 'normal',
    fontSize: scale(13),
  },
  active_text: {
    fontSize: scale(16),
    fontWeight: '400',
    color: Color?.White_Color,
    marginLeft:scale(5),
  },
});

export default styles;
