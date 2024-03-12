import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import EditText from '../EditText';
import {Color, Loader} from '@src/util';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { storyUpload } from '@src/redux/StoryAction';

interface AddStatusModalProps {
  imageurl: string;
  visible: boolean;
  onClose: () => void;
}

const AddStatusModal: FC<AddStatusModalProps> = ({
  imageurl,
  visible,
  onClose,
}) => {
  const [caption, setCaption] = useState('');
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpload = async () => {
    try {
      const pars = {
        imageurl,
        caption,
      };
      setLoading(true);
      const response = await storyUpload(pars);
      if (response) {
        setLoading(false),
          Toast.show({
            type: 'success',
            text1: 'Story Uploaded Successfully.',
          });
          onClose()
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
   
  };
  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <Loader Visible={loading} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <SafeAreaView style={[styles.container, {paddingTop: insets.top + 10}]}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>

          <Image source={{uri: imageurl}} style={styles.image} />
          <EditText
            Placholder="Add Text"
            Value={caption}
            outerBoxStyle={styles.captionInput}
            OnChangeText={text => setCaption(text)}
            OnSubmit={() => Keyboard.dismiss()}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    // backgroundColor:Color.Black_Color
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  uploadButton: {
    zIndex: 1,
    backgroundColor: Color.White_Color,
    padding: scale(10),
    borderRadius: scale(5),
  },
  uploadButtonText: {
    color: Color.Black_Color,
    fontSize: scale(16),
  },
  closeButton: {
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: scale(16),
  },
  image: {
    width: '95%',
    height: scale(300),
    resizeMode: 'cover',
    borderRadius: scale(10),
    marginTop: scale(20),
  },
  captionInput: {
    width: '100%',
    borderRadius: scale(5),
    backgroundColor: Color.White_Color,
    marginTop: 'auto',
  },
});

export default AddStatusModal;
