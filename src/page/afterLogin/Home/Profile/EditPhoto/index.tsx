import {View, Alert, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import ImageOptionModal from '@src/modal/ImageOptionModal';
import {CommonStyles, Strings, Loader} from '@src/util';
import {Label, HeaderGoToBack} from '@src/commonComponent';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {deleteProfilePic, updateProfilePic} from '@src/redux/LoginAction';
import {RootState} from '@src/store';
import ImageLayout from './ImageLayout';

interface ImageArray {
  pic: string;
  hasImage: boolean;
}

interface navigationProps {
  SelectInterest: {
    NAME: string;
    PHONE: string;
    DOB: string | number;
    SEX: string;
    LOCATION: string;
    BIO: string | number;
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
    FILE: string;
  };
}

type stackParamsList = {
  EditPhoto: {
    USER_ID: string;
  };
};

const EditPhoto = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const mRoute = useRoute<RouteProp<stackParamsList, 'EditPhoto'>>();
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const [imageArr, setImageArr] = useState<ImageArray[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const {USER_ID} = mRoute.params;
    const fetchData = async () => {
      try {
        const snapshot = await firestore()
          .collection('Users')
          .doc(USER_ID)
          .get();
        const imageArray = snapshot.data()?.PROFILE_PIC || [];
        const updatedImageArray = imageArray.map(pic => ({
          pic,
          hasImage: true,
        }));
        setImageArr(updatedImageArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const _selectImage = async () => {
    setShowModal(!showModal);
  };

  const clickClose = () => {
    setShowModal(!showModal);
  };

  const clickGallery = async () => {
    try {
      const res = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      });
      if (res?.assets) {
        setShowModal(false);
        setImageArr([
          ...imageArr,
          {pic: res?.assets[0]?.uri || '', hasImage: true},
        ]);
        const filename = res?.assets[0]?.uri?.substring(
          res?.assets[0]?.uri?.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? res?.assets[0]?.uri?.replace('file://', '')
            : res?.assets[0]?.uri;
        const {USER_ID} = mRoute.params;
        let pars = {
          uploadUri: uploadUri,
          userId: USER_ID,
          filename: filename,
        };
        dispatch(updateProfilePic(pars));
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  };

  const clickCamera = () => {
    launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
      maxHeight: 400,
      maxWidth: 400,
    }).then(res => {
      if (res?.assets) {
        setTimeout(() => {
          setShowModal(false);
        }, 400);
        setImageArr([
          ...imageArr,
          {pic: res?.assets[0]?.uri || '', hasImage: true},
        ]);
        const filename = res?.assets[0]?.uri?.substring(
          res?.assets[0]?.uri?.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? res?.assets[0]?.uri?.replace('file://', '')
            : res?.assets[0]?.uri;
        const {USER_ID} = mRoute.params;
        let pars = {
          uploadUri: uploadUri,
          userId: USER_ID,
          filename: filename,
        };
        dispatch(updateProfilePic(pars));
      }
    });
  };

  const _deleteImg = (Index: Number) => {
    let copyArr: any = [];
    for (let index = 0; index < imageArr.length; index++) {
      if (index != Index) {
        copyArr.push(imageArr[index]);
      }
    }
    setImageArr(copyArr);
    const {USER_ID} = mRoute.params;
    let pars = {UserId: USER_ID, pic: imageArr[Index]?.pic};
    dispatch(deleteProfilePic(pars));
  };

  const clickAddImage = (index: number) => {
    if (imageArr[index]?.hasImage) {
      showAlert(0, 'Are you sure, You want to delete this image', index);
    } else {
      if (imageArr.length == 2) {
        showAlert(1, 'You can upload maximum of two Photos', 1);
      } else {
        _selectImage();
      }
    }
  };

  const showAlert = (OPERATION: number, MESG: string, INDEX: number) => {
    Alert.alert('', MESG, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: OPERATION === 0 ? 'Yes' : 'OK',
        onPress: () => {
          if (OPERATION === 0) {
            _deleteImg(INDEX);
          } else {
          }
        },
      },
    ]);
  };

  return (
    <View style={CommonStyles?.main}>
      <HeaderGoToBack
        title={Strings?.addBestPhotos}
        onPress={() => navigation?.goBack()}
      />
      <Loader Visible={hideProgressBar} />
      <Label title={Strings?.addPhotoContent} textStyle={styles.txt} />
      <ImageOptionModal
        Visible={showModal}
        CloseModal={clickClose}
        OpenCamera={() => clickCamera()}
        OpenGallery={() => clickGallery()}
      />
      <ImageLayout ImageArary={imageArr} ClickAddImage={clickAddImage} />
    </View>
  );
};

export default EditPhoto;
