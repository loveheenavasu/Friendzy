import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Label} from '@src/commonComponent';
import Location from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import {Color} from '@src/util';
import firestore from '@react-native-firebase/firestore';
import {myAge} from '@src/util/Validator';

interface Props {
  Card: {id: string; uri: number; name: string; location: string; dob: any};
}
const NameLayout: FC<Props> = ({Card}) => {
  const [active, setActive] = useState<Boolean>(false);
  useEffect(() => {
    const subscribe = firestore()
      .collection('UsersVisibility')
      .onSnapshot(querydocument => {
        querydocument.forEach(doc => {
          if (Card?.id == doc?.id) {
            setActive(doc?.data().status);
          }
        });
      });
    return () => {
      subscribe;
    };
  }, []);

  return (
    <View style={[styles.detail_view]}>
      <View style={styles.row_view}>
        <View style={{maxWidth: '80%'}}>
          <Label
            numberofLine={1}
            title={`${Card?.name}, `}
            textStyle={styles?.card_name}
          />
        </View>
        <Label title={myAge(Card?.dob)} textStyle={styles?.card_age} />
      </View>
      <View style={[styles.row_view, {marginTop: scale(8)}]}>
        <Location name="location" size={24} color={Color?.White_Color} />
        <Label title={Card?.location} textStyle={styles?.location_txt} />
      </View>
      <View
        style={[
          styles.active_Con,
          {backgroundColor: active ? 'rgba(52,52,52,.4)' : Color.Light_white},
          active && {borderColor: Color.Active_green},
        ]}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: active
                ? Color.Active_green
                : Color.Primary_Color,
            },
          ]}
        />
        <Label
          title={active ? 'Active now' : 'Away now'}
          textStyle={[
            styles.active_text,
            {color: active ? Color.Active_green : Color.Primary_Color},
          ]}
        />
      </View>
    </View>
  );
};

export default NameLayout;
