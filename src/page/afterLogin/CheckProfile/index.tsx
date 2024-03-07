import {Image, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@src/util/types';
import {Label, WrapComponent} from '@src/commonComponent';
import {styles} from './styles';
import BackIcon from '@src/commonComponent/BackIcon';
import {myAge} from '@src/util/Validator';
import Swiper from 'react-native-swiper';
import {Color} from '@src/util';
import FastImage from 'react-native-fast-image';
import {getFlagImage} from '@src/util/commonFunction';
import { getInterestName } from '@src/util/StaticData/InterestArray';

type PublicProfileRouteProp = RouteProp<RootStackParamList, 'CheckProfile'>;

interface PublicProfileProps {
  route: PublicProfileRouteProp;
}
const CheckProfile = () => {
  const route: PublicProfileProps['route'] = useRoute();
  const otherUser = route.params.otherUser;
  const {
    BIO,
    COUNTRY,
    DOB,
    EMAIL,
    FILE,
    LIKE,
    LOCATION,
    NAME,
    PASS,
    PHONE,
    PROFILE_PIC,
    SEARCH_CRITERIA,
    SEX,
    SUPERLIKE,
    TOKEN,
    USER_ID,
  } = otherUser;
  // const navigation = useNavigation();
  const selectedInterests = SEARCH_CRITERIA.selectedInterests;
  return (
    <WrapComponent>
      <View style={styles.main}>
        <BackIcon />
        <Label title={NAME + ',' + myAge(DOB)} textStyle={styles.name} />
        <Label title={SEX} />
        <View style={styles.row}>
          <FastImage
            style={styles.flagImg}
            source={{uri: getFlagImage(COUNTRY)}}
          />
          <Label title={COUNTRY} />
        </View>
        <Swiper
          dotColor={Color.Light_Primary}
          autoplay
          containerStyle={styles.slide}
          loop
          horizontal>
          {PROFILE_PIC.map((pic, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{uri: pic}} style={styles.image} />
            </View>
          ))}
        </Swiper>
        <View style={styles.bioView}>
          <Label title={BIO} />
        </View>
        <Label title={'Interests'} textStyle={styles.blackText} />
        <View style={styles.interestView}>

        {selectedInterests?.map((item, index) => {
          return (
            <View key={index} style={styles.bioItem}>
              <Label title={getInterestName(item)} />
            </View>
          );
        })}
        </View>

      </View>
    </WrapComponent>
  );
};

export default CheckProfile;
