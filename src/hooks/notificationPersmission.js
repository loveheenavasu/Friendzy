import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const notificationPermission = () => {
  const [token, setToken] = useState('');

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      // console.log('Authorization status:', authStatus);
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
        .then(res => {})
        .catch(error => {
          console.log('----error----->', error);
        });
    }
  }, []);

  useEffect(() => {
    requestUserPermission()
      .then(res => {
        messaging()
          .getToken()
          .then(token => {
            setToken(token);
          });
      })
      .catch(Error => {});
    return () => {
      messaging().onTokenRefresh(res => {});
    };
  }, []);

  return [token, setToken];
};

export default notificationPermission;
