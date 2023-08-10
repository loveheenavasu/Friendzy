import {Label} from '@src/commonComponent';
import {Color} from '@src/util';
import React, {FC} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Strings} from '@src/util';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  Visible: boolean;
  SelectedProfile: any;
}

const BottomModal: FC<Props> = ({Visible, SelectedProfile}) => {
  const navigation = useNavigation<any>();

  return (
    <Modal visible={Visible} animationType="slide" transparent={true}>
      <View style={styles.main}>
        <View style={styles.inner_Main}>
          <View style={styles.inner_Child}>
            {/* <FastImage
              source={{uri: Uri}}
              style={styles.profile_Pic}
              resizeMode="contain"
            /> */}
            <TouchableOpacity>
              <Label
                title={SelectedProfile?.NAME}
                textStyle={styles.name_Label}
              />
            </TouchableOpacity>

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
            <View style={styles.active_Con}>
              <View style={styles.dot} />
              <Label title={'Active Now'} textStyle={styles.active_Label} />
            </View>
            <Label title={Strings.aboutUs} textStyle={styles.des_Title} />
            <Label
              title={SelectedProfile?.BIO}
              textStyle={styles.des_Label}
              numberofLine={2}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
