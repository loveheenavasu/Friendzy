import {FlatList, Platform, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CommonStyles, Color, Strings, Loader} from '@src/util';
import {Label, CustomButton} from '@src/commonComponent';
import ImageOptionModal from '@src/modal/ImageOptionModal';
import {hitLogoutApi, updateProfilePic} from '@src/redux/LoginAction';
import * as Storage from '@src/service';
import styles from './styles';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import notificationPermission from '@src/hooks/notificationPersmission';
import loginUserHooks from '@src/hooks/loginUserHooks';
import {setOnlineOfflineStatus} from '@src/redux/ChatAction';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';
import CustomImage from '@src/commonComponent/CustomImage/Image';
const Image = createImageProgress(FastImage);

const DummyData = [
  {title: Strings?.editProfile, goto: 'EditProfile'},
  {title: Strings?.searchCriteria, goto: 'SearchCriteria'},
  {title: Strings?.goUpgradeVip, goto: 'GoUpgradeVip'},
  {title: Strings?.changePassword, goto: 'ChangePassword'},
];

interface userData {
  pic: string | undefined;
  openModal: boolean;
  name: string;
  userId: string | undefined;
}

interface navigationProps {
  EditProfile: {
    USER_ID: string | undefined;
  };
  EditPhoto: {
    USER_ID: string | undefined;
  };
  SearchCriteria: undefined;
}

var subscriber: any = null;
const Profile: FC = () => {
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const [token, setToken] = notificationPermission();
  const [loginId, setLoginId] = loginUserHooks();

  const [userData, setUserData] = useState<userData>({
    pic: '',
    openModal: false,
    name: '',
    userId: '',
  });

  useEffect(() => {
    let pars = {status: 'active'};
    dispatch(setOnlineOfflineStatus(pars));
  }, []);

  useEffect(() => {
    Storage.retrieveData('USER_ID').then(id => {
      subscriber = firestore()
        .collection('Users')
        .doc(id)
        .onSnapshot((documentSnapshot: FirebaseFirestoreTypes.DocumentData) => {
          if (documentSnapshot?.data()) {
            let {NAME, PROFILE_PIC} = documentSnapshot.data();
            setUserData(prevData => ({
              ...prevData,
              name: NAME,
              userId: id,
              pic: PROFILE_PIC?.length > 0 ? PROFILE_PIC[0] : '',
            }));
            Storage.storeData('NAME', NAME);
          }
        });
    });
    return () => subscriber;
  }, []);

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(loginId?.toString())
      .update({TOKEN: token})
      .then(res => {})
      .catch(error => {});
  }, [token]);

  const clickGallery = async () => {
    launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }).then(res => {
      if (res?.assets) {
        setUserData({
          ...userData,
          openModal: false,
          pic: res?.assets[0]?.uri,
        });
        const filename = res?.assets[0]?.uri?.substring(
          res?.assets[0]?.uri?.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? res?.assets[0]?.uri?.replace('file://', '')
            : res?.assets[0]?.uri;
        let pars = {
          uploadUri: uploadUri,
          userId: userData.userId,
          filename: filename,
        };
        dispatch(updateProfilePic(pars));
      }
    });
  };

  const clickCamera = () => {
    launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
      maxHeight: 400,
      maxWidth: 400,
    }).then(res => {
      if (res?.assets) {
        setUserData({
          ...userData,
          openModal: false,
          pic: res?.assets[0]?.uri,
        });
        const filename = res?.assets[0]?.uri?.substring(
          res?.assets[0]?.uri?.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? res?.assets[0]?.uri?.replace('file://', '')
            : res?.assets[0]?.uri;
        let pars = {
          uploadUri: uploadUri,
          userId: userData.userId,
          filename: filename,
        };
        dispatch(updateProfilePic(pars));
      }
    });
  };

  const logOut = () => {
    let pars = {email: ''};
    let pars2 = {status: 'logou'};
    dispatch(setOnlineOfflineStatus(pars2));
    dispatch(hitLogoutApi(pars));
  };

  const footerLayout = () => {
    return (
      <CustomButton
        name={Strings?.logout}
        btnStyle={styles?.btnStyle}
        txtStyle={CommonStyles?.txtStyle}
        onPress={() => logOut()}
      />
    );
  };

  const renderLayout = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.rowView}
        onPress={() => {
          item.goto === 'EditProfile'
            ? navigation?.navigate('EditProfile', {USER_ID: userData.userId})
            : item.goto === 'GoUpgradeVip'
            ? navigation.navigate('GoUpgradeVip')
            : item.goto === 'SearchCriteria'
            ? navigation.navigate('SearchCriteria')
            : navigation.navigate('ChangePassword');
          // :
        }}>
        <Label title={item?.title} textStyle={styles.titleTxt} />
        <Arrow
          name="keyboard-arrow-right"
          size={28}
          color={Color?.Black_Color}
          style={{opacity: 0.5}}
        />
      </TouchableOpacity>
    );
  };

  const clickClose = () => {
    setUserData({...userData, openModal: !userData?.openModal});
  };

  return (
    <View style={CommonStyles?.main}>
      <Loader Visible={hideProgressBar} />
      <View style={styles.imgBox}>
        {userData?.pic ? (
          // <Image source={{uri: userData?.pic}} style={styles.img} />
          <CustomImage styles={styles.img} uri={{uri: userData?.pic}} />
        ) : (
          <Entypo
            name="user"
            size={scale(50)}
            color={'grey'}
            style={{opacity: 0.4}}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.change_Con}
        // onPress={() => setUserData({...userData, openModal: true})}
        onPress={() =>
          navigation.navigate('EditPhoto', {USER_ID: userData.userId})
        }>
        <Label title={Strings?.changeProfile} textStyle={styles.txt} />
      </TouchableOpacity>
      <Label title={userData?.name} textStyle={styles.nameTxt} />
      <FlatList
        data={DummyData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: verticalScale(10)}}
        renderItem={renderLayout}
        style={styles.menuView}
        ListFooterComponent={footerLayout()}
        keyExtractor={(intem, index) => index.toString()}
      />
      <ImageOptionModal
        Visible={userData.openModal}
        CloseModal={clickClose}
        OpenCamera={() => clickCamera()}
        OpenGallery={() => clickGallery()}
      />
    </View>
  );
};

export default Profile;
