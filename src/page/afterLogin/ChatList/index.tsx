import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ActiveDot from '@src/commonComponent/ActiveDot';
import {CommonStyles, Loader} from '@src/util';
import {Ago} from '@src/util/Validator';
import {useDispatch, useSelector} from 'react-redux';
import {getAllChatList} from '@src/redux/LoginAction';
import {RootState} from '@src/store';
import {Color, Icon} from '@src/util';
import {Label} from '@src/commonComponent';
import styles from './styles';
import onlineOfflineHooks from '@src/hooks/onlineOfflineHooks';
import loginUserHooks from '@src/hooks/loginUserHooks';
import CustomImage from '@src/commonComponent/CustomImage/Image';
import StatusLayout from './StatusLayout';

type navigationProps = {
  ChatScreen: {
    INFO: any;
  };
};

const ChatList: FC = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();

  const dispatch = useDispatch<any>();
  const {hideProgressBar, chatList} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const {lastMessage} = useSelector((state: RootState) => state.chatAction);
  const [loginId, setLoginId] = loginUserHooks();
  const [userList, setUserList] = onlineOfflineHooks();
  const [list, setList] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAllChatList());
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setList(chatList);
  }, [chatList]);

  useEffect(() => {
    const senderId = lastMessage?.sendBy;
    const senderIndex = list.findIndex(item => item?.sendBy === senderId);
    if (senderIndex !== -1) {
      list[senderIndex].count = list[senderIndex]?.count + 1; // Modify the count property
      list[senderIndex].msg = lastMessage?.chatData[0]?.text;
      list[senderIndex].time = lastMessage?.chatData[0]?.createdAt;
    }
  }, [lastMessage]);

  const clickNext = (item: any) => {
    navigation.navigate('ChatScreen', {
      INFO: {
        PROFILE_PIC: [item.profilePic],
        NAME: item?.name,
        USER_ID: loginId == item.sendTo ? item.sendBy : item.sendTo,
      },
    });
  };

  const _chatList = ({item}: any) => {
    const {name, msg, time, profilePic, count, userId} = item;
    
    return (
      <TouchableOpacity
        style={styles.chat_mainview}
        onPress={() => clickNext(item)}>
        <View style={styles.img_box}>
          {/* <FastImage source={{uri: profilePic}} style={styles.profile_Con} /> */}
          <CustomImage uri={{ uri: profilePic }} styles={styles.profile_Con} resizeMode={'cover'} />
          {userList?.some(ITEM => ITEM?.userId == userId && ITEM.status) && (
            <ActiveDot dotStyle={styles.dot_Con} />
          )}
        </View>
        <View style={styles.msg_box}>
          <Label title={name} textStyle={styles?.chat_name_txt} />
          <Label title={msg} textStyle={styles?.grey_small_txt} />
        </View>
        <View style={styles.time_box}>
          <Label title={Ago(time) ?? ''} textStyle={styles?.grey_small_txt} />
          {count > 0 && (
            <View style={styles.unread_circle_view}>
              <Label
                title={count}
                textStyle={{
                  ...styles?.grey_small_txt,
                  color: Color?.White_Color,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CommonStyles?.main}>
      <Loader Visible={hideProgressBar} />
      <StatusLayout />
      <FlatList
        data={list}
        renderItem={_chatList}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flat_ChatList_Child}
        style={styles.flat_ChatList}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty_Con}>
              <Label
                textStyle={styles.empty_Lable}
                title={hideProgressBar ? '' : 'Chat list not available'}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ChatList;
