import {Label} from '@src/commonComponent';
import {Strings} from '@src/util';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface Props {
  onClickReset?: () => void;
}

const EmptyLayout: FC<Props> = ({onClickReset}) => {
  return (
    <View style={styles.empty_Main}>
      <Label
        title="All cards are done, Please click close button "
        textStyle={styles.not_Found}
      />
      <TouchableOpacity style={styles.reset_Con} onPress={onClickReset}>
        <Label title={Strings.reset} textStyle={styles.reset_Label} />
      </TouchableOpacity>
    </View>
  );
};

export default EmptyLayout;
