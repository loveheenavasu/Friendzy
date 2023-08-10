import {View, TouchableOpacity, Alert, Platform} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import ImageOptionModal from '@src/modal/ImageOptionModal';
import {CommonStyles, Strings, Color} from '@src/util';
import {Label, HeaderGoToBack, CustomButton} from '@src/commonComponent';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const DummyData = Array.from({length: 6}, () => undefined);

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
  AddPhotos: {
    NAME: string;
    PHONE: string;
    DOB: string | number;
    SEX: string;
    LOCATION: string;
    BIO: string | number;
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
  };
};

const AddPhotos = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const mRoute = useRoute<RouteProp<stackParamsList, 'AddPhotos'>>();
  const [imageArr, setImageArr] = useState<ImageArray[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileArray, setFileArray] = useState<Object[]>([]);

  const _selectImage = async () => {
    setShowModal(!showModal);
  };

  const clickClose = () => {
    setShowModal(!showModal);
  };

  const clickGallery = async () => {
    launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    })
      .then(res => {
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
          let imageFile = {
            uploadUri: uploadUri,
            filename: filename,
          };
          fileArray.push(imageFile);
        }
      })
      .catch(Error => {});
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
        let imageFile = {
          uploadUri: uploadUri,
          filename: filename,
        };
        fileArray.push(imageFile);
      }
    });
  };

  const _deleteImg = (index: number) => {
    const copyArr = imageArr.filter((_, i) => i !== index);
    const imageCopy = fileArray.filter((_, i) => i !== index);

    setFileArray(imageCopy);
    setImageArr(copyArr);
  };

  const clickNext = () => {
    if (imageArr.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select atleast one Photo',
      });
    } else {
      let mNewRoute = {...mRoute.params, FILE: fileArray};
      navigation.navigate('SelectInterest', mNewRoute);
    }
  };

  const clickAddImage = (index: number) => {
    if (imageArr[index]?.hasImage) {
      _deleteImg(index);
    } else {
      if (imageArr.length == 2) {
        Alert.alert('You can upload maximum of two Photos');
      } else {
        _selectImage();
      }
    }
  };

  return (
    <View style={CommonStyles?.main}>
      <HeaderGoToBack
        title={Strings?.addBestPhotos}
        onPress={() => navigation?.goBack()}
      />
      <Label title={Strings?.addPhotoContent} textStyle={styles.txt} />
      <ImageOptionModal
        Visible={showModal}
        CloseModal={clickClose}
        OpenCamera={() => clickCamera()}
        OpenGallery={() => clickGallery()}
      />
      <View style={styles.list_Main}>
        {DummyData.map((item, index) => {
          return (
            <View key={index} style={styles.list_F_Child}>
              {imageArr[index]?.pic && (
                <FastImage
                  source={{uri: imageArr[index]?.pic}}
                  resizeMode="cover"
                  style={styles.pic}
                />
              )}
              <TouchableOpacity
                style={styles.rounded}
                onPress={() => clickAddImage(index)}>
                <AntDesign
                  name="plus"
                  color={Color.White_Color}
                  size={scale(23)}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <CustomButton
        name={Strings?.next}
        btnStyle={CommonStyles?.btnStyle}
        txtStyle={CommonStyles?.txtStyle}
        onPress={() => clickNext()}
      />
    </View>
  );
};

export default AddPhotos;
