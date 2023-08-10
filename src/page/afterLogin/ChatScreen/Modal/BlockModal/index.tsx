import {Label} from '@src/commonComponent';
import {Color} from '@src/util';
import React, {FC} from 'react';
import {View, Modal} from 'react-native';
import {scale} from 'react-native-size-matters';

interface Props {
  Visible?: boolean;
  Name?: string;
}

const BlockModal: FC<Props> = ({Visible, Name}) => {
  return (
    <Modal visible={Visible} transparent={true} animationType="slide">
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(52,52,52,.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: Color.Second_Primary,
            marginHorizontal: '5%',
            borderRadius: scale(10),
            padding: scale(15),
          }}>
          <Label title={`Block ${Name}`} />
        </View>
      </View>
    </Modal>
  );
};

export default BlockModal;
