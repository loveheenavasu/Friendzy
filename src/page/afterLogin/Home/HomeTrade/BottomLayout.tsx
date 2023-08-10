import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {Color} from '@src/util';
import {scale} from 'react-native-size-matters';

interface Props {
  onClickNope?: () => void;
  onClickLike?: () => void;
  onClickSupper?: () => void;
}

const BottomLayout: FC<Props> = ({onClickNope, onClickLike, onClickSupper}) => {
  return (
    <View style={styles.bottom_Con}>
      <TouchableOpacity style={styles.circle_Con} onPress={onClickNope}>
        <Fontisto name="close-a" color={Color.Primary_Color} size={scale(17)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle_Con} onPress={onClickLike}>
        <FontAwesome
          name="heart-o"
          color={Color.Primary_Color}
          size={scale(22)}
          style={{marginTop: scale(4)}}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circle_Con} onPress={onClickSupper}>
        <Feather name="star" color={Color.Primary_Color} size={scale(25)} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomLayout;
