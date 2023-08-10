import {Label} from '@src/commonComponent';
import {Color} from '@src/util';
import React, {FC} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Strings} from '@src/util';
import styles from './styles';

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
  return (
    <Modal visible={Visible} animationType="slide" transparent={true}>
      <View style={styles.main}>
        <View style={styles.inner_Main}>
          <View style={styles.inner_Child}>
            <FastImage
              source={{uri: Uri}}
              style={styles.profile_Pic}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => OnClickNext(SelectedProfile)}>
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
              <TouchableOpacity
                style={styles.send_B_Con}
                onPress={OnClickMessage}>
                <Label title={Strings.sendMesg} textStyle={styles.send_Label} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;
