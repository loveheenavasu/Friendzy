import {View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import * as Storage from '@src/service';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {
  getUnReadMessageCount,
  sendMessageNotification,
  updateChatTable,
  updateLastMessage,
} from '@src/redux/ChatAction';
import {CommonStyles, Icon, Loader} from '@src/util';
import {HeaderGoToBack} from '@src/commonComponent';
import BlockModal from './Modal/BlockModal';
import {updateCount} from '@src/redux/LoginAction';

const data = [
  {id: 1, title: 'Report', icon: Icon?.Report},
  {id: 2, title: 'Block', icon: Icon?.Block},
];

type routesProps = {
  EditPhoto: {
    INFO: {
      USER_ID: string;
      PROFILE_PIC: any;
      NAME: string;
    };
  };
};

var subscriber: any = null;

const ChatScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {hideProgressBar, mCount} = useSelector(
    (state: RootState) => state.chatAction,
  );
  const mRoute = useRoute<RouteProp<routesProps, 'EditPhoto'>>();

  const [messages, setMessages] = useState<any>([]);
  const [count, setCount] = useState(mCount);
  const [active, setActive] = useState<boolean>(false);
  const [timeAgo, setTimeAgo] = useState<Date>();
  const [deviceToken, setDeviceToken] = useState<string>('');
  const [userData, setUserData] = useState({
    profilePic: '',
    name: '',
    receiverName: '',
    loginUserId: '',
    receiverProfilePic: '',
  });

  useEffect(() => {
    dispatch(updateCount(0));
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('UsersVisibility')
      .onSnapshot(querydocument => {
        querydocument.forEach(doc => {
          if (mRoute?.params?.INFO?.USER_ID == doc.id) {
            setActive(doc?.data().status);
            setTimeAgo(
              new firestore.Timestamp(
                doc?.data()?.time.seconds,
                doc?.data()?.time.nanoseconds,
              ).toDate(),
            );
          }
        });
      });
    return () => {
      subscribe;
    };
  }, []);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(mRoute?.params?.INFO?.USER_ID)
      .get()
      .then(snapData => {
        setDeviceToken(snapData.data()?.TOKEN);
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const id = await Storage.retrieveData('USER_ID');
        const {USER_ID, NAME, PROFILE_PIC} = mRoute?.params?.INFO;
        setUserData(prevData => ({
          ...prevData,
          receiverName: NAME,
          loginUserId: id ?? '',
          receiverProfilePic: PROFILE_PIC[0],
        }));
        if (typeof id === 'string') {
          getChat(USER_ID, id);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    getData();
  }, []);

  const getChat = async (SenderId: string, LoginUserId: string) => {
    const chatid =
      SenderId > LoginUserId
        ? LoginUserId + '-' + SenderId
        : SenderId + '-' + LoginUserId;

    const unsubscribe = firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('Message')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const mTemp: any = [];
        querySnapshot.forEach(doc => {
          const {chatData} = doc.data();
          const transformedMessages = chatData.map(mlist => ({
            _id: mlist?._id,
            text: mlist?.text,
            createdAt: new firestore.Timestamp(
              mlist?.createdAt.seconds,
              mlist?.createdAt.nanoseconds,
            ).toDate(),
            user: {
              _id: doc.data()?.sendBy,
              name: mlist?.user.name,
            },
          }));
          mTemp.push(...transformedMessages);
        });
        setMessages(mTemp);
      });

    let pars = {
      chatid: chatid,
      loginUserId: LoginUserId,
    };
    dispatch(getUnReadMessageCount(pars));
    return unsubscribe;
  };

  useEffect(() => {
    Storage.retrieveData('USER_ID').then(id => {
      subscriber = firestore()
        .collection('Users')
        .doc(id)
        .onSnapshot((documentSnapshot: FirebaseFirestoreTypes.DocumentData) => {
          let {NAME, PROFILE_PIC} = documentSnapshot.data();
          setUserData(preData => ({
            ...preData,
            name: NAME,
            profilePic: PROFILE_PIC[0],
          }));
        });
    });
    return () => subscriber;
  }, []);

  const onSend = (messages: any, ID: string) => {
    const {USER_ID, PROFILE_PIC} = mRoute?.params?.INFO;
    // console.log('-----mRoute?.params?.INFO--->', mRoute?.params?.INFO);
    setMessages((previousArr: any) => GiftedChat.append(previousArr, messages));
    let myMesg = {
      chatData: messages,
      sendBy: ID,
      sendTo: USER_ID,
      createdAt: firestore.FieldValue.serverTimestamp(),
      sendToProfile: PROFILE_PIC[0],
      sendByProfile: userData.profilePic,
      senderName: userData.name,
      receiverName: userData.receiverName,
      count: count + 1,
    };
    let actor = {
      msg: myMesg,
      loginId: ID,
      userId: USER_ID,
      token: deviceToken,
    };
    dispatch(updateLastMessage(actor));
    dispatch(updateChatTable(actor));
    dispatch(sendMessageNotification(actor));
    setCount(count + 1);
  };

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        chatOpen={mRoute?.params?.INFO}
        onPress={() => navigation.goBack()}
        title=""
        showActive={active}
        timeAgo={timeAgo?.toString()}
      />
      {/* <Loader Visible={hideProgressBar} /> */}
      <BlockModal Visible={false} />
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={false}
        onSend={messages => onSend(messages, userData.loginUserId)}
        user={{
          _id: userData.loginUserId,
          name: userData.name,
        }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default ChatScreen;
