import {Label} from '@src/commonComponent';
import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Strings} from '@src/util';

interface Props {
  ShowLike: boolean;
  ShowSupperLike: boolean;
  ShowNope: boolean;
}

const CenterLayout: FC<Props> = ({ShowLike, ShowSupperLike, ShowNope}) => {
  return (
    <>
      {ShowLike && (
        <View style={styles.like_Con}>
          <Label title={Strings.like} textStyle={styles.like_Label_Box} />
        </View>
      )}
      {ShowSupperLike && (
        <View style={styles.like_Con}>
          <Label title={Strings.supperLike} textStyle={styles.supper_Like} />
        </View>
      )}
      {ShowNope && (
        <View style={styles.nope_Con}>
          <Label title={Strings.nope} textStyle={styles.nope_Label_Box} />
        </View>
      )}
    </>
  );
};

export default CenterLayout;
