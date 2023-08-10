import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Search, CustomButton, HeaderGoToBack} from '@src/commonComponent';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';
import {Strings, CountryList, CommonStyles, Color} from '@src/util';
import {dynamicStyle, styles} from './styles';
import {scale} from 'react-native-size-matters';

interface dummyObject {
  id: number;
  flag: any;
  name: string;
}

interface navigationProps {
  Profile: {
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
  };
}

interface userDataType {
  search: string;
  activeId: number;
  country: string;
}

type stackParamsList = {
  SelectCountry: {
    EMAIL: string;
    PASS: string | number;
  };
};

const SelectCountry = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const mRoute = useRoute<RouteProp<stackParamsList, 'SelectCountry'>>();

  const [list, setList] = useState<dummyObject[]>(CountryList);
  const [userData, setUserData] = useState<userDataType>({
    search: '',
    activeId: -1,
    country: '',
  });

  const _selectCountry = (e: any) => {
    setUserData({...userData, country: e?.name, activeId: e?.id});
  };

  const searchCountry = (e: string) => {
    const filterArr = CountryList?.filter(item => {
      if (item?.name?.toUpperCase()?.includes(e?.toUpperCase())) {
        return item;
      }
    });
    setList(filterArr);
    setUserData({...userData, search: e});
  };

  const submit = () => {
    if (!userData?.country) {
      Toast.show({
        type: 'error',
        text1: 'Please select one country',
      });
    } else {
      const {EMAIL, PASS} = mRoute?.params;
      navigation.navigate('Profile', {
        EMAIL: EMAIL,
        PASS: PASS,
        COUNTRY: userData.country,
      });
    }
  };

  const renderLayout: ListRenderItem<dummyObject> = ({item}) => {
    return (
      <TouchableOpacity
        style={dynamicStyle(item?.id == userData?.activeId).main_List}
        onPress={() => _selectCountry(item)}>
        <View style={styles.f_Child}>
          <FastImage source={{uri: item?.flag}} style={styles.country_img} />
        </View>
        <View style={styles.s_Child}>
          <Text style={styles.countryTxt}>{item?.name}</Text>
        </View>
        <View style={styles.f_Child}>
          <View style={styles.circle}>
            <View
              style={
                dynamicStyle(item?.id == userData?.activeId).inner_circle
              }></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title={Strings?.selectCountry}
        onPress={() => navigation?.goBack()}
      />
      <Search
        outerBoxStyle={styles.search_Con}
        value={userData?.search}
        onChangeText={(e: string) => searchCountry(e)}
        inputStyle={{color:Color?.Black_Color}}
      />
      <FlatList
        data={list}
        keyExtractor={item => item?.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list_Main}
        renderItem={renderLayout}
        getItemLayout={(data, index) => ({
          length: scale(52),
          offset: scale(52 * index),
          index,
        })}
      />
      <CustomButton
        name={Strings.next}
        btnStyle={styles.btnStyle}
        txtStyle={styles.txtStyle}
        onPress={() => submit()}
      />
    </View>
  );
};

export default SelectCountry;
