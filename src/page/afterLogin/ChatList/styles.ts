import {Color} from '@src/util';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  status_view: {
    marginHorizontal: scale(10),
    alignItems: 'center',
    height: verticalScale(92),
  },

  name_txt: {
    color: Color?.Primary_Color,
    fontWeight: '400',
    fontSize: scale(14),
    marginTop: verticalScale(3),
  },
  chat_mainview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.White_Color,
    width: '96%',
    marginHorizontal: '2%',
    paddingHorizontal: scale(7),
    paddingVertical: scale(10),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginTop: scale(5),
  },
  img_box: {
    width: '20%',
  },
  msg_box: {
    width: '50%',
  },
  time_box: {
    width: '30%',
    alignItems: 'center',
    marginLeft: scale(10),
  },
  unread_circle_view: {
    backgroundColor: Color?.Unread_red,
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat_name_txt: {
    fontWeight: 'bold',
    fontSize: scale(12),
    opacity: 0.8,
    color: Color?.Black_Color,
  },
  grey_small_txt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Grey_Color,
  },
  profile_Con: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(30),
    borderColor: Color.Primary_Color,
    borderWidth: scale(0.6),
  },
  dot_Con: {
    position: 'absolute',
    right: scale(10),
    height: scale(12),
    width: scale(12),
    borderRadius: scale(10),
  },
  flat_ChatList: {
    width: '100%',
    height: '100%',
  },
  flat_ChatList_Child: {
    marginTop: scale(10),
    paddingBottom: scale(70),
  },
  empty_Con: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_Lable: {
    color: Color.Black_Color,
    marginTop: scale(200),
  },
});

export default styles;
