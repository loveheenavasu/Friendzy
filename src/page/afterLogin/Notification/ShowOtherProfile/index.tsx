import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Color, CommonStyles} from '@src/util';
import {useNavigation, useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {Label} from '@src/commonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Strings, InterestArray} from '@src/util';
import styles from './styles';

const ShowOtherProfile = () => {
  const mRoute = useRoute();
  const navigation = useNavigation();
  const [selectedList, setSelectedLis] = useState<Object[]>([]);

  useEffect(() => {
    let mCheck = InterestArray.filter(
      item => item.id in mRoute.params?.ITEM?.SELECTED_INTEREST,
    );
    setSelectedLis(mCheck);
  }, []);

  return (
    <View style={[CommonStyles.main, {paddingHorizontal: 0}]}>
      <View style={styles.banner_Con}>
        <Swiper style={styles.wrapper} activeDotColor={Color.Primary_Color}>
          {mRoute?.params?.ITEM?.PROFILE_PIC.map((item, index) => {
            return (
              <FastImage
                key={index}
                style={styles.profile_Con}
                resizeMode="contain"
                source={{uri: item}}
              />
            );
          })}
        </Swiper>
      </View>
      <View style={styles.second_Child}>
        <View style={styles.bottom_Child_Con}>
          <Label
            title={mRoute?.params?.ITEM?.NAME}
            textStyle={styles.name_Label}
          />
          <View style={{flexDirection: 'row', marginVertical: scale(7)}}>
            <Ionicons
              name="ios-location-outline"
              color={Color.Black_Color}
              size={scale(16)}
              style={styles.location_Icon}
            />
            <Label
              title={mRoute?.params?.ITEM?.LOCATION.toUpperCase()}
              textStyle={styles.location_Label}
            />
          </View>
          <View style={styles.active_Con}>
            <View style={styles.dot} />
            <Label title={'Active Now'} textStyle={styles.active_Label} />
          </View>
          <Label title={Strings.aboutUs} textStyle={styles.des_Title} />
          <Label
            title={mRoute?.params?.ITEM?.BIO}
            textStyle={styles.des_Label}
            numberofLine={2}
          />
          <Label title={Strings.interest} textStyle={styles.des_Title} />

          <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {selectedList.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: Color.Primary_Color,
                    marginHorizontal: scale(2),
                    marginTop: scale(4),
                    borderRadius: scale(20),
                  }}>
                  <Label
                    title={item?.name}
                    textStyle={{
                      paddingVertical: scale(5),
                      paddingHorizontal: scale(10),
                      fontSize: scale(12),
                      color: Color.White_Color,
                    }}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity
        style={styles.back_Con}
        onPress={() => navigation.goBack()}>
        <Entypo
          name="chevron-left"
          color={Color.Primary_Color}
          size={scale(25)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ShowOtherProfile;
