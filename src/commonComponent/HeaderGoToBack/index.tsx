import {Alert, FlatList, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import ActiveDot from '../ActiveDot';
import {Color, Icon} from '@src/util';
import {Label} from '@src/commonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import {Ago} from '@src/util/Validator';

interface chatType {
  NAME: string;
  PROFILE_PIC: [];
}

interface Props {
  title: string;
  onPress: () => void;
  chatOpen?: chatType;
  bgColor?: ViewStyle;
  showActive?: boolean;
  timeAgo?: string;
  offModal?:boolean
  setOffModal?:()=>void;
}

const data = [
  {id: 1, title: 'Report', icon: Icon?.Report},
  {id: 2, title: 'Block', icon: Icon?.Block},
];

const HeaderGoToBack: FC<Props> = ({
  title,
  onPress,
  chatOpen,
  bgColor,
  showActive,
  timeAgo,
  offModal,
  setOffModal
}) => {
  const {NAME, PROFILE_PIC} = chatOpen || {};
  // const [isOpen, setOpen] = useState(false);
  const _GreyLine = () => {
    return <View style={styles.Gline}></View>;
  };
  return (
    <View style={{...styles.main, ...bgColor}}>
      <TouchableOpacity style={styles.back_Con} onPress={onPress}>
        <Entypo
          name="chevron-left"
          color={Color.Primary_Color}
          size={scale(25)}
        />
      </TouchableOpacity>
      {chatOpen && (
        <View style={styles.user_info_box}>
          <View>
            <FastImage
              style={styles.profile_Con}
              source={{uri: PROFILE_PIC[0]}}
            />
            {showActive && <ActiveDot dotStyle={styles.dot_Con} />}
          </View>
          <View style={styles.user_details}>
            <Label title={NAME ?? ''} textStyle={styles.name_text} />
            <Label
              title={showActive ? 'Active now' : Ago(timeAgo ?? '')?.toString()}
              textStyle={styles.active_text}
            />
          </View>
          <TouchableOpacity
            style={styles.dot_box}
            onPress={() => {
              // setOpen(!isOpen)
              setOffModal(prev => !prev)
            }
            }>
            <FastImage
              source={Icon?.Dots}
              resizeMode="contain"
              style={styles.dots_icon}
            />
          </TouchableOpacity>
          {offModal && (
            <View style={styles.report_block_box}>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={styles.row_view}
                      onPress={() => Alert.alert('HIII')}>
                      <FastImage
                        source={item?.icon}
                        resizeMode="contain"
                        style={styles.block_icon}
                      />
                      <Label title={item?.title} textStyle={styles.txt} />
                    </TouchableOpacity>
                  );
                }}
                ItemSeparatorComponent={_GreyLine}
              />
            </View>
          )}
        </View>
      )}
      <Label textStyle={styles.txtColor} title={title} />
    </View>
  );
};

export default HeaderGoToBack;
