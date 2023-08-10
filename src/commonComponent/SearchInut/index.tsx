import React, {FC} from 'react';
import {View, TextInput, Image, TextStyle} from 'react-native';
import Color from '../../util/Color';
import {scale} from 'react-native-size-matters';
import Icon from '../../util/Icon';
import styles from './styles';

interface Props {
  value: string;
  onChangeText: (txt: any) => void;
  inputStyle?: TextStyle;
  outerBoxStyle?: TextStyle;
}

const Search: FC<Props> = ({
  value,
  onChangeText,
  inputStyle,
  outerBoxStyle,
}) => {
  return (
    <View style={{...styles.main, ...outerBoxStyle}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        style={{...styles.input, ...inputStyle}}
        placeholderTextColor={Color?.Grey_Color}
        autoFocus={false}
      />
      <View
        style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: scale(20), height: scale(20)}}
          source={Icon?.Search}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
export default Search;
