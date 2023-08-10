import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, AppState} from 'react-native';
import Splash from './src/page/beforeLogin/Splash';
import strings from './src/util/Localization/string';
import Navigator from './src/page/navigation';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {updateCount} from '@src/redux/LoginAction';
import {
  setOnlineOfflineStatus,
  updateLastMessageList,
} from '@src/redux/ChatAction';

const App: FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    strings.setLanguage('en');
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    let pars = {status: nextAppState};
    dispatch(setOnlineOfflineStatus(pars));
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.data?.type === 'CHAT') {
        let response = remoteMessage?.data?.body;
        let chatMessage = JSON.parse(response);
        dispatch(updateLastMessageList(chatMessage));
      }
      dispatch(updateCount(1));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <Splash />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <Navigator />
        </SafeAreaView>
      )}
      <Toast />
    </>
  );
};

export default App;
