import {TextStyle, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import DropDown from 'react-native-drop-down-mith';
import strings from '../../util/Localization/string';
import {scale} from 'react-native-size-matters';
import Label from '../Label';
import {Color, CommonStyles} from '@src/util';
import styles from './styles';

interface Props {
  onClick: (txt: string) => void;
  labelStyle: TextStyle;
  showStar: Boolean;
  outerView?: ViewStyle;
  selectedValue?: string;
  dropDownStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const DropDownPick: FC<Props> = ({
  onClick,
  labelStyle,
  showStar,
  outerView,
  selectedValue,
  titleStyle,
}) => {
  const NameWithStar = () => {
    return (
      <Label
        title={strings?.gender}
        textStyle={{...CommonStyles?.field_txt, ...titleStyle}}
        showStar={true}
        starStyle={{marginTop: scale(-5)}}
      />
    );
  };
  return (
    <DropDown
      containerStyle={{...styles.drop_box, ...outerView}}
      titleStyle={{...styles.label_txt, ...labelStyle}}
      title={showStar ? NameWithStar() : strings.gender}
      onClick={onClick}
      placeHolder={strings.selectGender}
      selectedTextStyle={{marginLeft: scale(10)}}
      itemTextStyle={{marginLeft: scale(10),color:Color?.Black_Color}}
      data={[
        {id: 0, value: 'Male'},
        {id: 0, value: 'Female'},
        {id: 0, value: 'Transgender'},
      ]}
      selectedText={selectedValue}
    />
  );
};

export default DropDownPick;
