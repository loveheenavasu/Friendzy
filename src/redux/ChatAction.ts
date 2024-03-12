import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import * as Storage from '@src/service';
import {postMessageNotification} from '@src/util/ApiConfig';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';

const initialState = {
  hideProgressBar: false,
  notificationCount: 0,
  chatList: [],
  mCount: 0,
  lastMessage: '',
};

export const updateLastMessageList = createAsyncThunk(
  'UPDATE_LAST_MESSAGE_LIST',
  async pars => {
    let response = pars;
    return response;
  },
);

export const updateLastMessage = createAsyncThunk(
  'UPDATE_LAST_MESSAGE',
  async (pars: {msg: any; loginId: string; userId: string}) => {
    const chatid =
      pars.userId > pars.loginId
        ? pars.loginId + '-' + pars.userId
        : pars.userId + '-' + pars.loginId;
    return await firestore()
      .collection('LastMessage')
      .doc(chatid)
      .set(pars?.msg)
      .then(res => {})
      .catch(error => {});
  },
);

export const updateChatTable = createAsyncThunk(
  'UPDATE_CHAT_TABLE',
  async (pars: {msg: any; loginId: string; userId: string}) => {
    const chatid =
      pars.userId > pars.loginId
        ? pars.loginId + '-' + pars.userId
        : pars.userId + '-' + pars.loginId;
    firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('Message')
      .add(pars.msg)
      .then(res => {})
      .catch(error => {});
  },
);
export const sendMessageNotification = createAsyncThunk(
  'SEND_MESSAGE_NOTIFICATION',
  async (pars: {msg: any; loginId: string; userId: string; token: string}) => {
    // console.log("---pars.token----->",pars.token );
    const res = await postMessageNotification(pars);
    // console.log('---res---------->', res);
  },
);

export const getUnReadMessageCount = createAsyncThunk(
  'SET_UNREAD_COUNT',
  async (pars: {chatid: string; loginUserId: string}) => {
    try {
      const res = await firestore()
        .collection('LastMessage')
        .doc(pars.chatid)
        .get();

      let count = 0;
      if (res?.exists) {
        if (res?.data()?.sendTo === pars.loginUserId) {
          await firestore()
            .collection('LastMessage')
            .doc(pars.chatid)
            .update({count: 0});
        } else {
          count = res?.data()?.count;
        }
      }
      return count;
    } catch (error) {
      console.log('--error----->', error);
      throw error;
    }
  },
);

export const setOnlineOfflineStatus = createAsyncThunk(
  'SET_VISIBILITY',
  async (pars: {status: string}) => {
    const id = await Storage.retrieveData('USER_ID');
    if (id) {
      firestore()
        .collection('UsersVisibility')
        .doc(id)
        .set({
          status: pars.status === 'active' ? true : false,
          time: firestore.Timestamp.fromDate(new Date()),
        });
    }
  },
);


export const ChatAction = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateLastMessage.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(updateLastMessage.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updateLastMessage.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(getUnReadMessageCount.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(getUnReadMessageCount.fulfilled, (state, action) => {
      return {...state, mCount: action?.payload};
    });
    builder.addCase(getUnReadMessageCount.rejected, (state, action) => {
      return {...state};
    });
    builder.addCase(updateLastMessageList.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(updateLastMessageList.fulfilled, (state, action) => {
      return {...state, lastMessage: action.payload ?? ''};
    });
    builder.addCase(updateLastMessageList.rejected, (state, action) => {
      return {...state};
    });
  },
});

export default ChatAction.reducer;
