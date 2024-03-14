import {EditText, Label, WrapComponent} from '@src/commonComponent';
import {Color, Icon} from '@src/util';
import React, {FC, useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Strings} from '@src/util';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import Feather from 'react-native-vector-icons/Feather';
import {unMatchSkip} from '@src/redux/LoginAction';
import {sendMessageNotification, updateChatTable, updateLastMessage} from '@src/redux/ChatAction';

interface Props {
  LoginUserId: string;
  LoginName: string | undefined;
}

interface DataType {
  receiverName: string;
  count: number;
  profilePic: string;
  matchProfilePic: string;
}

const MatchModal: FC<Props> = ({LoginUserId, LoginName}) => {
  const dispatch = useDispatch<any>();
  const {matchUserId} = useSelector((state: RootState) => state.login_Reducer);
  const [message, setMessage] = useState('');
  const [userData, setData] = useState<DataType>({
    receiverName: '',
    count: 0,
    profilePic: '',
    matchProfilePic: '',
  });

  useEffect(() => {
    firestore()
      .collection('Users')
      .where('USER_ID', '==', LoginUserId)
      .limit(1)
      .get()
      .then(res => {
        res.docs.forEach(data => {
          let mProfilePic = data.data()?.PROFILE_PIC;
          setData(PreData => ({...PreData, profilePic: mProfilePic[0]}));
        });
      });

    firestore()
      .collection('Users')
      .where('USER_ID', '==', matchUserId)
      .limit(1)
      .get()
      .then(res => {
        res.docs.forEach(data => {
          let mProfilePic = data.data()?.PROFILE_PIC;
          setData(PreData => ({
            ...PreData,
            matchProfilePic: mProfilePic[0],
            receiverName: data.data()?.NAME,
          }));
        });
      });
  }, []);

  const onClickSend = async () => {
    if (message?.trim() && matchUserId) {
      const chatid =
        matchUserId > LoginUserId
          ? LoginUserId + '-' + matchUserId
          : matchUserId + '-' + LoginUserId;
      setMessage('');
    }
    let messages = [
      {
        _id: Math.random(),
        createdAt: new Date(),
        text: message?.trim(),
        user: {_id: LoginUserId, name: LoginName},
      },
    ];
    let myMesg = {
      chatData: messages,
      sendBy: LoginUserId,
      sendTo: matchUserId,
      createdAt: firestore.FieldValue.serverTimestamp(),
      sendToProfile: userData?.matchProfilePic,
      sendByProfile: userData.profilePic,
      senderName: LoginName,
      receiverName: userData?.receiverName,
      count: userData?.count + 1,
    };
    let otherUserFcmToken;
    await firestore()
      .collection('Users')
      .doc(matchUserId)
      .get()
      .then(snapData => {
        otherUserFcmToken= snapData.data()?.TOKEN
      });
    let actor = {
      msg: myMesg,
      loginId: LoginUserId,
      userId: matchUserId,
      token: otherUserFcmToken,

    };
    dispatch(updateLastMessage(actor));
    dispatch(updateChatTable(actor));
    dispatch(sendMessageNotification(actor));

    setData(PreData => ({...PreData, count: PreData.count + 1}));
  };
  return (
    <FastImage source={Icon.HeartBackground} style={styles.main}>
      <WrapComponent>
        <FastImage
          source={Icon.Congratulation}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.cong_Icon}
        />
        <Label textStyle={styles.match_Label} title={Strings.matchFound} />
        <View style={styles.icon_Main_Con}>
          <FastImage
            style={styles.f_Profile}
            source={{uri: userData?.profilePic}}
          />
          <FastImage
            style={styles.s_Profile}
            source={{uri: userData?.matchProfilePic}}
          />
        </View>
        <View style={styles.input_Main}>
          <EditText
            outerBoxStyle={styles.edit_Main}
            Style={styles.edit}
            Placholder={Strings.sendMesg}
            Value={message}
            OnChangeText={txt => setMessage(txt)}
            ReturnKeyType="done"
            OnSubmit={() => Keyboard.dismiss()}
          />
          <TouchableOpacity style={styles.send_Icon_Main} onPress={onClickSend}>
            <Feather
              name="send"
              color={Color.Black_Color}
              size={scale(20)}
              style={styles.send}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.skip_Con}
          onPress={() => dispatch(unMatchSkip())}>
          <Label title={Strings.skip} textStyle={styles.skip_Label} />
        </TouchableOpacity>
      </WrapComponent>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52,52,52,0.7)',
    zIndex: 999999,
    alignItems: 'center',
  },
  cong_Icon: {
    width: '80%',
    height: scale(100),
  },
  match_Label: {
    color: '#F499C9',
    marginTop: scale(-30),
    alignSelf: 'center',
  },
  icon_Main_Con: {
    width: '100%',
    height: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  f_Profile: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: scale(4),
    borderColor: Color.Second_Primary,
  },
  s_Profile: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    borderWidth: scale(4),
    borderColor: Color.Primary_Color,
    marginLeft: scale(-30),
  },
  input_Main: {
    width: '90%',
    marginHorizontal: '5%',
    height: scale(45),
    borderRadius: scale(30),
    borderColor: Color.LIGHT_GREY,
    borderWidth: scale(1),
    flexDirection: 'row',
  },
  edit_Main: {
    width: '88%',
    height: '100%',
    borderColor: Color.White_Color,
  },
  edit: {
    width: '100%',
    height: '100%',
    paddingLeft: scale(10),
  },
  send_Icon_Main: {
    width: '12%',
    height: '100%',
    justifyContent: 'center',
  },
  send: {
    opacity: 0.4,
  },
  skip_Con: {
    width: scale(100),
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: scale(10),
  },
  skip_Label: {
    fontSize: scale(12),
    color: Color.Primary_Color,
    textDecorationLine: 'underline',
    textDecorationColor: Color.Primary_Color,
  },
});

export default MatchModal;
