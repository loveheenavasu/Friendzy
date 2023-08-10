import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth, {firebase} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as Storage from '@src/service';

import {postMethod} from '@src/util/ApiConfig';
import {myAge} from '@src/util/Validator';

export interface CounterState {
  value: number;
  hideProgressBar: boolean;
  email: string;
  tradeList: any;
  notificationCount: number;
  likeList: Object[];
  chatList: Object[];
  showPerfectMatch?: boolean;
  matchUserId?: string;
  gender?: string;
  age?: Object;
  location?: string;
}

const initialState: CounterState = {
  value: 0,
  hideProgressBar: false,
  email: '',
  tradeList: [],
  notificationCount: 0,
  likeList: [],
  chatList: [],
  showPerfectMatch: false,
  matchUserId: '',
  gender: '',
  age: '',
  location: '',
};

interface updateProfile {
  BIO: string;
  DOB: Date | string;
  EMAIL: string;
  LOCATION: string;
  NAME: string;
  PHONE: string;
  SEX: string;
  USER_ID: string;
}

interface updateProfilePicType {
  uploadUri: string;
  userId: string;
  filename: string;
}

export const hitLoginApi = createAsyncThunk(
  'HIT_LOGIN_API',
  async (pars: {email: string; password: string | number; token: string}) => {
    try {
      await auth().signInWithEmailAndPassword(
        pars.email,
        pars?.password.toString(),
      );
      Toast.show({
        type: 'success',
        text1: 'User login successfully',
      });
    } catch (error) {
      if (error?.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'User does not exists',
        });
      } else if (error?.code == 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: 'Email and Password does not exists',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: JSON.stringify(error?.code),
        });
      }
      throw error;
    }
  },
);

export const hitLogoutApi = createAsyncThunk(
  'HIT_LOGOUT_API',
  async (pars: {email: string | undefined}) => {
    return await auth().signOut();
  },
);
export const updateProfile = createAsyncThunk(
  'UPDATE_PROFILE',
  async (pars: updateProfile) => {
    await firestore()
      .collection('Users')
      .doc(pars.USER_ID)
      .update(pars)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Profile update successfully',
        });
      })
      .catch(error => {});
    firestore()
      .collection('LastMessage')
      .where('sendTo', '==', pars.USER_ID)
      .get()
      .then(doc => {
        console.log('doc', doc.docs);
        doc.docs.forEach(snapshot => {
          firestore()
            .collection('LastMessage')
            .doc(snapshot.id)
            .update({receiverName: pars.NAME});
        });
      })
      .catch(error => {
        console.log('-------->', error);
      });

    firestore()
      .collection('LastMessage')
      .where('sendBy', '==', pars.USER_ID)
      .get()
      .then(doc => {
        console.log('doc', doc.docs);
        doc.docs.forEach(snapshot => {
          firestore()
            .collection('LastMessage')
            .doc(snapshot.id)
            .update({senderName: pars.NAME});
        });
      })
      .catch(error => {
        console.log('-------->', error);
      });
  },
);

interface newPassObj {
  USER_ID: string;
  newPassword: string;
}

// Update password
export const updatePassword = createAsyncThunk(
  'UPDATE_PASSWORD',
  async (pars: newPassObj) => {
    const {USER_ID, newPassword} = pars;
    // changing password in auth Table
    const currentUser = firebase.auth().currentUser;
    if (currentUser?.email) {
      await currentUser
        .updatePassword(newPassword)
        .then(() => {
          console.log('Password updated successfully');
        })
        .catch(error => {
          console.log('--updatePassword----error-->', error);
        });
    }

    // change password in Users table
    return await firestore()
      .collection('Users')
      .doc(USER_ID)
      .update({PASS: newPassword})
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Password change successfully',
        });
      })
      .catch(error => {});
  },
);

export const updateProfilePic = createAsyncThunk(
  'UPDATE_PROFILE_PIC',
  async (pars: updateProfilePicType) => {
    try {
      const uploadSnapshot = await storage()
        .ref(pars.userId)
        .child(pars.filename)
        .putFile(pars.uploadUri);
      const downloadURL = await storage()
        .ref(pars.userId)
        .child(pars.filename)
        .getDownloadURL();
      await firestore()
        .collection('Users')
        .doc(pars.userId)
        .update({
          PROFILE_PIC: firestore.FieldValue.arrayUnion(downloadURL),
        });
    } catch (error) {
      console.log('Error updating profile picture:', error);
      throw error;
    }
  },
);

export const deleteProfilePic = createAsyncThunk(
  'DELETE_PROFILE_PIC',
  async (pars: {UserId: string; pic: string}) => {
    try {
      await storage().refFromURL(pars?.pic).delete();
      await firestore()
        .collection('Users')
        .doc(pars?.UserId)
        .update({
          PROFILE_PIC: firestore.FieldValue.arrayRemove(pars?.pic),
        });
      Toast.show({
        type: 'success',
        text1: 'Profile pic delete successfully',
      });
    } catch (error) {
      console.log('Error deleting profile pic:', error);
      throw error;
    }
  },
);

export const getAllUser = createAsyncThunk('GET_ALL_USER', async pars => {
  try {
    const genderFilter = await Storage.retrieveData('GENDER');
    const ageFilter = await Storage.retrieveData('AGE');
    const querySnapshot = await firestore().collection('Users').get();
    const mTemp = querySnapshot.docs.map(documentSnapshot =>
      documentSnapshot.data(),
    );
    if (ageFilter && genderFilter) {
      let ageFilterList = [];
      const {minAge, maxAge} = JSON.parse(ageFilter);
      for (let index = 0; index < mTemp.length; index++) {
        let dateOfBirth = myAge(mTemp[index].DOB);
        if (dateOfBirth >= minAge && dateOfBirth <= maxAge) {
          ageFilterList.push(mTemp[index]);
        }
      }
      let filterList = ageFilterList.filter(
        (item, index) => item.SEX == genderFilter,
      );
      return JSON.parse(JSON.stringify(filterList));
    } else if (ageFilter) {
      let ageFilterList = [];
      const {minAge, maxAge} = JSON.parse(ageFilter);
      for (let index = 0; index < mTemp.length; index++) {
        let dateOfBirth = myAge(mTemp[index].DOB);
        if (dateOfBirth >= minAge && dateOfBirth <= maxAge) {
          ageFilterList.push(mTemp[index]);
        }
      }
      return JSON.parse(JSON.stringify(ageFilterList));
    } else if (genderFilter) {
      let filterList = mTemp.filter((item, index) => item.SEX == genderFilter);
      return JSON.parse(JSON.stringify(filterList));
    } else {
      return JSON.parse(JSON.stringify(mTemp));
    }
  } catch (error) {
    return [];
  }
});

export const setUserSearchCriteria = createAsyncThunk(
  'SET_USER_SEARCH_CRITERIA',
  async (pars: {gender: string; age: Object; location: string}) => {
    return pars;
  },
);

export const checkPerfectMatch = createAsyncThunk(
  'CHECK_MATCH',
  async (pars: {loginUserId: string; userId: string}) => {
    const likeData = await firestore()
      .collection('Users')
      .doc(pars?.loginUserId)
      .get();

    let mTemp: any = [];
    if (likeData.exists) {
      const userData = likeData.data();
      console.log('User Data:', userData?.LIKE);
      if (userData?.LIKE) {
        mTemp = [...userData?.LIKE];
      }
    } else {
      console.log('User not found.');
      return false;
    }
    if (mTemp.includes(pars?.userId)) {
      let actor = {match: true, matchuserId: pars?.userId};
      return actor;
    }
  },
);

export const unMatchSkip = createAsyncThunk('UNMATCH', async pars => {
  return null;
});

export const sendNotification = createAsyncThunk(
  'SEND_NOTIFICATION',
  async (pars: any) => {
    try {
      const res = await postMethod(pars);
      await firestore()
        .collection('Users')
        .doc(pars?.userId)
        .update({
          LIKE: firestore.FieldValue.arrayUnion(pars.loginUserId),
        });

      let mCheck = [
        {
          photoId: pars?.userId,
          userId: pars.loginUserId,
          likeTime: firestore.Timestamp.fromDate(new Date()),
        },
      ];

      firestore()
        .collection('Likes')
        .doc(pars?.userId)
        .set(
          {
            LIKE_DATA: firestore.FieldValue.arrayUnion(...mCheck),
          },
          {merge: true},
        )
        .then(res => {
          console.log('---inside-like-->', 1);
        })
        .catch(error => {});
    } catch (error) {
      console.log('----error--->', error);
    }
  },
);

export const updateCount = createAsyncThunk(
  'UPDATE_COUNT',
  async (pars: any) => {
    return pars;
  },
);

export const getAllLike = createAsyncThunk(
  'GET_ALL_LIKE',
  async (pars: {userId: string | undefined}) => {
    try {
      const querySnapshot = await firestore()
        .collection('Likes')
        .doc(pars.userId)
        .get();
      const likeArray = querySnapshot.data()?.LIKE_DATA;
      if (likeArray && likeArray.length > 0) {
        const userIds = likeArray.map((item: any) => item.userId);
        const likeTime = likeArray.map((item: any) => item.likeTime);
        const allUser = await firestore()
          .collection('Users')
          .where('USER_ID', 'in', userIds)
          .get();
        const mTemp = allUser.docs.map((documentSnapshot, index) => {
          return {
            ...documentSnapshot.data(),
            time: likeTime[index].toDate(),
          };
        });
        mTemp.sort((a, b) => b.time - a.time);
        return JSON.parse(JSON.stringify(mTemp));
      } else {
        console.log('LIKE_DATA is empty or not available');
      }
    } catch (error) {}
  },
);

export const getAllChatList = createAsyncThunk(
  'GET_ALL_CHAT_LIST',
  async pars => {
    try {
      const id = await Storage.retrieveData('USER_ID');
      const sendToQuery = firestore()
        .collection('LastMessage')
        .where('sendTo', '==', id);

      const sendByQuery = firestore()
        .collection('LastMessage')
        .where('sendBy', '==', id);

      const [sendToSnapshot, sendBySnapshot] = await Promise.all([
        sendToQuery.get(),
        sendByQuery.get(),
      ]);
      const mergedDocs = [...sendToSnapshot.docs, ...sendBySnapshot.docs];
      let mTemp: any = [];
      mergedDocs.forEach(documentSnapshot => {
        let Actor = {
          sendBy: documentSnapshot.data()?.sendBy,
          msg: documentSnapshot.data()?.chatData[0]?.text,
          sendTo: documentSnapshot.data()?.sendTo,
          time: documentSnapshot.data()?.createdAt.toDate().toString(),
          profilePic:
            documentSnapshot.data()?.sendBy === id
              ? documentSnapshot.data()?.sendToProfile
              : documentSnapshot.data()?.sendByProfile,
          name:
            documentSnapshot.data()?.sendBy === id
              ? documentSnapshot.data()?.receiverName
              : documentSnapshot.data()?.senderName,

          count:
            id == documentSnapshot.data()?.sendTo
              ? documentSnapshot.data()?.count
              : 0,
          userId:
            documentSnapshot.data()?.sendBy === id
              ? documentSnapshot.data()?.sendTo
              : documentSnapshot.data()?.sendBy,
        };
        mTemp.push(Actor);
      });
      return mTemp;
    } catch (error) {
      throw error; // Rethrow the error to handle it in the calling function
    }
  },
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(hitLoginApi.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(hitLoginApi.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(hitLoginApi.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(hitLogoutApi.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(hitLogoutApi.fulfilled, state => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(hitLogoutApi.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });

    builder.addCase(updateProfile.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updatePassword.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updateProfilePic.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updateProfilePic.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(getAllUser.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      // console.log("-getAllUser.fulfilled-----action?.payload---->", action?.payload);
      return {...state, hideProgressBar: false, tradeList: action?.payload};
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(deleteProfilePic.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(deleteProfilePic.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(deleteProfilePic.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(updateCount.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(updateCount.fulfilled, (state, action) => {
      return {
        ...state,
        notificationCount:
          action?.payload === 0 ? 0 : state.notificationCount + 1,
      };
    });
    builder.addCase(updateCount.rejected, (state, action) => {
      return {...state};
    });
    builder.addCase(getAllLike.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(getAllLike.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false, likeList: action?.payload};
    });
    builder.addCase(getAllLike.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(getAllChatList.pending, (state, action) => {
      return {...state, hideProgressBar: true};
    });
    builder.addCase(getAllChatList.fulfilled, (state, action) => {
      return {...state, hideProgressBar: false, chatList: action?.payload};
    });
    builder.addCase(getAllChatList.rejected, (state, action) => {
      return {...state, hideProgressBar: false};
    });
    builder.addCase(checkPerfectMatch.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(checkPerfectMatch.fulfilled, (state, action) => {
      return {
        ...state,
        showPerfectMatch: action?.payload?.match,
        matchUserId: action.payload?.matchuserId,
      };
    });
    builder.addCase(checkPerfectMatch.rejected, (state, action) => {
      return {...state};
    });
    builder.addCase(unMatchSkip.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(unMatchSkip.fulfilled, (state, action) => {
      return {...state, showPerfectMatch: false};
    });
    builder.addCase(unMatchSkip.rejected, (state, action) => {
      return {...state};
    });
    builder.addCase(setUserSearchCriteria.pending, (state, action) => {
      return {...state};
    });
    builder.addCase(setUserSearchCriteria.fulfilled, (state, action) => {
      return {
        ...state,
        gender: action?.payload?.gender,
        location: action?.payload?.location,
        age: action?.payload?.age,
      };
    });
    builder.addCase(setUserSearchCriteria.rejected, (state, action) => {
      return {...state};
    });
  },
});
export default counterSlice.reducer;
