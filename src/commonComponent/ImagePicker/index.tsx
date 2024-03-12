import React from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, Text, Pressable} from 'react-native';
import CrossIcon from 'react-native-vector-icons/AntDesign';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  CameraOptions,
  MediaType,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {scale} from 'react-native-size-matters';
import Photo from 'react-native-vector-icons/Foundation';
import Toast from 'react-native-toast-message';
import Cross from 'react-native-vector-icons/MaterialIcons';
type pickedMediaType = string | string[];

interface ImagePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelectMedia: (selectedImageUris: string[] | string | any) => void;
  selectedData: string;
  selectOne?: boolean;
  type: MediaType;
  onSelectMediaType: (value: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  visible,
  onClose,
  onSelectMedia,
  selectedData,
  selectOne,
  type,
  onSelectMediaType,
}) => {
  const handleGalleryOption = () => {
    onClose()
    const options: ImageLibraryOptions = {
      mediaType: type ? type : 'photo', // Set mediaType based on the provided type
      includeBase64: false,
      maxHeight: 1024,
      maxWidth: 1024,
      quality: 0.5,
      selectionLimit: selectOne ? 1 : 5 - selectedData.length,
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        if (selectedAsset && selectedAsset.fileSize) {
          const fileSizeInMB = selectedAsset.fileSize / (1024 * 1024); // Convert to MB
          if (fileSizeInMB > 50) {
            Toast.show({
              type: 'error',
              text1: 'Please Choose file smaller than 50MB.',
            });
            return;
          }
        }
        if (selectOne) {
          const selectMediaType = response.assets[0].type;
          const selectedMedia =
            response.assets[0][type === 'video' ? 'uri' : 'uri'];
          // console.log(selectedMedia);
          if (selectedMedia && selectMediaType) {
            onSelectMedia(selectedMedia);
            onSelectMediaType(selectMediaType);
          }
        } else {
          const newSelectedMedia = response.assets.map(
            asset => asset[type === 'video' ? 'uri' : 'uri'],
          );
          const selectMediaType = response.assets[0].type;

          if (newSelectedMedia.length > 0 && selectMediaType) {
            onSelectMedia([
              ...selectedData,
              ...newSelectedMedia,
            ] as pickedMediaType);
            onSelectMediaType(selectMediaType);
          }
        }
      }
    });
  };

  const handleCameraIconPress = (type: MediaType) => {
    onClose()

    const options: CameraOptions = {
      mediaType: type, // Set mediaType based on the provided type
      includeBase64: false,
      maxHeight: 1024,
      maxWidth: 1024,
      quality: 0.5,
      videoQuality: 'low',
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedAsset = response.assets[0];
        if (selectedAsset && selectedAsset.fileSize) {
          const fileSizeInMB = selectedAsset.fileSize / (1024 * 1024); // Convert to MB
          if (fileSizeInMB > 50) {
            Toast.show({
              type: 'error',
              text1: 'Please Choose file smaller than 50MB.',
            });
            return;
          }
        }
        if (selectOne) {
          const selectedMedia =
            response.assets[0][type === 'video' ? 'uri' : 'uri'];
          const selectMediaType = response.assets[0].type;

          // console.log(selectedMedia);
          if (selectedMedia && selectMediaType) {
            onSelectMedia(selectedMedia);
            onSelectMediaType(selectMediaType);
          }
        } else {
          const newSelectedMedia = response.assets.map(
            asset => asset[type === 'video' ? 'uri' : 'uri'],
          );
          const selectMediaType = response.assets[0].type;
          // console.log('selectMediaType', selectMediaType);

          if (newSelectedMedia.length > 0 && selectMediaType) {
            onSelectMedia([
              ...selectedData,
              ...newSelectedMedia,
            ] as pickedMediaType);
            onSelectMediaType(selectMediaType);
          }
        }
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <Pressable onPress={onClose} style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>Select Image</Text>
          <TouchableOpacity style={styles.flex} onPress={handleGalleryOption}>
            <Photo name="photo" size={scale(24)} color={'black'} />
            <Text style={styles.text}>Choose from gallery</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
          </View>
          <TouchableOpacity
            style={styles.flex}
            onPress={() => handleCameraIconPress('photo')}>
            <Photo name="camera" size={scale(24)} color={'black'} />
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#808080'}} />
          </View>
          <TouchableOpacity style={styles.flex} onPress={() => onClose()}>
            <CrossIcon
              size={scale(24)}
              onPress={onClose}
              name="closecircleo"
              color={'black'}
            />
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalView: {
    paddingTop: scale(20),
    paddingLeft: scale(10),
    height: scale(180),
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  cross: {
    position: 'absolute',
    top: scale(10),
    right: scale(10),
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(10),
  },
  text: {
    fontSize: scale(12),
    marginLeft: scale(10),
    color: 'black',
  },
  heading: {
    color: 'black',
  },
});

export default ImagePicker;
