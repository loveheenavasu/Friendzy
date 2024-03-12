import {Label} from '@src/commonComponent';
import {Color, Loader} from '@src/util';
import React, {FC, useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Strings} from '@src/util';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import * as Storage from '@src/service';
import {useDispatch} from 'react-redux';
import {checkPerfectMatch, sendNotification} from '@src/redux/LoginAction';

interface Props {
  Visible: boolean;
  Uri: string;
  SelectedProfile: any;
  OnClickBack?: () => void;
  OnClickNext?: (item: any) => void;
  OnClickMessage?: () => void;
  ActiveList?: [];
}

const PopUpModal: FC<Props> = ({
  Visible,
  Uri,
  SelectedProfile,
  OnClickBack,
  OnClickNext,
  OnClickMessage,
  ActiveList,
}) => {
  let online = ActiveList?.some(
    ITEM => ITEM?.userId == SelectedProfile?.USER_ID && ITEM.status,
  );
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPerfectMatchLoader, setIsPerfectMatchLoader] = useState<boolean>(false)
  
  const isPerfectMatch = async () => {
    try {
      setIsPerfectMatchLoader(true)
      const loginUserId = await Storage.retrieveData('USER_ID');
      const loggedInUserData = await firestore()
        .collection('Users')
        .doc(loginUserId)
        .get();
      if (!loggedInUserData.exists) {
        console.log('Logged-in user document not found');
        return [];
      }
      const loggedInUser = loggedInUserData.data();
      const perfectMatchUserIds = (loggedInUser && loggedInUser.LIKE) || [];
      if (
        SelectedProfile &&
        perfectMatchUserIds.includes(SelectedProfile.USER_ID) &&
        SelectedProfile.LIKE?.includes(loginUserId)
      ) {
        setSendMessage(true);
        console.log(SelectedProfile.USER_ID);
      } else {
        setSendMessage(false);
      }
      setIsPerfectMatchLoader(false)

    } catch (error) {
      setIsPerfectMatchLoader(false)
      console.error('Error fetching other user stories:', error);
      return [];
    }
  };
  useEffect(() => {
    isPerfectMatch();
  },[]);
  
  const dispatch = useDispatch<any>();
  const likeBackUser = async () => {
    try {
      setLoading(true);
      const userId = await Storage.retrieveData('USER_ID');
      const userDoc = await firestore().collection('Users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();

        if (userData) {
          let pars = {
            token: SelectedProfile?.TOKEN,
            name: SelectedProfile?.NAME,
            userId: SelectedProfile?.USER_ID,
            userName: userData.NAME,
            loginUserId: userData?.USER_ID,
            SUPERLIKE: false,
          };
          dispatch(sendNotification(pars));
          dispatch(
            checkPerfectMatch({
              loginUserId: userData?.USER_ID,
              userId: SelectedProfile?.USER_ID,
            }),
          );
        }
      }
      setSendMessage(true)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  if(isPerfectMatchLoader){
    return <Loader Visible={isPerfectMatchLoader} />
    
  }

  return (
    <Modal visible={Visible} animationType="slide" transparent={true}>
      <Loader Visible={loading} />
      <View style={styles.main}>
        <View style={styles.inner_Main}>
          <View style={styles.inner_Child}>
            <FastImage
              source={{uri: Uri}}
              style={styles.profile_Pic}
              resizeMode="contain"
            />
            {/* <TouchableOpacity onPress={() => OnClickNext(SelectedProfile)}> */}
            <Label
              title={SelectedProfile?.NAME}
              textStyle={styles.name_Label}
            />
            {/* </TouchableOpacity> */}

            <View style={{flexDirection: 'row', marginVertical: scale(7)}}>
              <Ionicons
                name="ios-location-outline"
                color={Color.Black_Color}
                size={scale(16)}
                style={styles.location_Icon}
              />
              <Label
                title={SelectedProfile?.LOCATION.toUpperCase()}
                textStyle={styles.location_Label}
              />
            </View>
            <View style={online ? styles.active_Con : styles.non_Active_Con}>
              <View style={online ? styles.dot : styles.dot2} />
              <Label
                title={online ? 'Active Now' : 'Away'}
                textStyle={
                  online ? styles.active_Label : styles.non_Active_Label
                }
              />
            </View>

            <Label title={Strings.description} textStyle={styles.des_Title} />
            <Label
              title={SelectedProfile?.BIO}
              textStyle={styles.des_Label}
              numberofLine={2}
            />
            <View style={styles.bottom_B_Con}>
              <TouchableOpacity style={styles.back_B_Con} onPress={OnClickBack}>
                <Label title={Strings.back} textStyle={styles.back_Label} />
              </TouchableOpacity>
              {sendMessage ? (
                <TouchableOpacity
                  style={styles.send_B_Con}
                  onPress={OnClickMessage}>
                  <Label
                    title={Strings.sendMesg}
                    textStyle={styles.send_Label}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.send_B_Con}
                  onPress={likeBackUser}>
                  <Label
                    title={Strings.LikeBack}
                    textStyle={styles.send_Label}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;
