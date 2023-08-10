import React, {useEffect, useState} from 'react';
import {} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const onlineOfflineHooks = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('UsersVisibility')
      .onSnapshot(querydocument => {
        const userData: any = [];
        querydocument.forEach(doc => {
          let actor = {userId: doc.id, status: doc?.data().status};
          userData.push(actor);
        });
        setUserList(userData);
      });
    return () => {
      subscribe;
    };
  }, []);

  return [userList, setUserList];
};

export default onlineOfflineHooks;
