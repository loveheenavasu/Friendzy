import React, {FC} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../util/Color';
import Label from '../commonComponent/Label';

interface Props {
  Visible: boolean;
  CloseModal: () => void;
  OpenCamera: () => void;
  OpenGallery: () => void;
}

const ImageOptionModal: FC<Props> = ({
  Visible,
  CloseModal,
  OpenCamera,
  OpenGallery,
}) => {
  return (
    <Modal visible={Visible} transparent={true} animationType="slide">
      <TouchableOpacity activeOpacity={1} onPress={CloseModal}>
        <View style={styles.main}>
          <View style={styles.bottom_Main}>
            <TouchableOpacity activeOpacity={1} style={styles.select_Image_Con}>
              <Label
                textStyle={styles.image_Option}
                title="Select Image option"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.camera_Con} onPress={OpenCamera}>
              <Label textStyle={styles.camera_Label} title="Open Camera" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gallery_Con} onPress={OpenGallery}>
              <Label textStyle={styles.gallery_Label} title="Open Gallery" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancel_Con} onPress={CloseModal}>
              <Label textStyle={styles.camera_Label} title="Cancel" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  bottom_Main: {
    width: '100%',
    height: verticalScale(200),
    backgroundColor: Color.White_Color,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  camera_Con: {
    width: '100%',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingLeft: scale(20),
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: scale(1),
  },
  camera_Label: {
    color: Color.Black_Color,
    opacity: 0.7,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  gallery_Con: {
    width: '100%',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingLeft: scale(20),
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: scale(1),
  },
  gallery_Label: {
    color: Color.Black_Color,
    opacity: 0.7,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  cancel_Con: {
    width: '100%',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingLeft: scale(20),
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: scale(1),
  },
  cancel_Label: {
    color: Color.Black_Color,
    opacity: 0.7,
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  select_Image_Con: {
    width: '100%',
    height: verticalScale(45),
    justifyContent: 'center',
    paddingLeft: scale(20),
    borderBottomColor: Color.LIGHT_GREY,
    borderBottomWidth: scale(1),
  },
  image_Option: {
    color: Color.Grey_Color,
  },
});

export default ImageOptionModal;
