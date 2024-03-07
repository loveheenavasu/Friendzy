import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Slider from 'react-native-a11y-slider';
import {useNavigation} from '@react-navigation/native';
import {CommonStyles, Color, Strings, Loader, InterestArray} from '@src/util';
import {
  HeaderGoToBack,
  Label,
  WrapComponent,
  CustomButton,
  DropDownPick,
} from '@src/commonComponent';
import styles, {dynamicStyles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSearchCriteria} from '@src/redux/LoginAction';
import {RootState} from '@src/store';
import * as Storage from '@src/service';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import firestore from '@react-native-firebase/firestore';

interface ageVal {
  minAge: Number;
  maxAge: Number;
}

const SearchCriteria = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<any>();
  const {gender, age, location} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const [mlocation, setLoction] = useState<string>('');
  const [mGender, setGender] = useState<string>('Male');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [mAge, setAge] = useState<ageVal>({
    minAge: 0,
    maxAge: 79,
  });
  const [selectedInterests, setSelectedInterests] = useState<Number[]>([]);

  useEffect(() => {
    setShowLoader(true);
    Storage.retrieveData('USER_ID').then(async id => {
      if (id) {
        const userRef = await firestore().collection('Users').doc(id).get();
        if (userRef.exists) {
          let userData = userRef.data();
          // console.log(userData?.SEARCH_CRITERIA);
          if (userData?.SEARCH_CRITERIA) {
            setLoction(userData?.SEARCH_CRITERIA?.mLocation);
            setAge({
              maxAge: userData?.SEARCH_CRITERIA?.mAge.maxAge,
              minAge: userData?.SEARCH_CRITERIA?.mAge.minAge,
            });
            setSelectedInterests(userData?.SEARCH_CRITERIA?.selectedInterests);
            setGender(userData?.SEARCH_CRITERIA?.mGender);
          }
        }
      }
    }).catch(err=>{
      console.log(err);
    }).finally(()=>{
      setShowLoader(false);
    });
  }, []);

  const setAgeVal = (ageArr: Number[]) => {
    const [min, max] = ageArr;
    setAge({...mAge, minAge: min, maxAge: max});
  };

  const clickApply = () => {
    setShowLoader(true);
    let pars = {
      mGender: mGender,
      mAge: mAge,
      mLocation: mlocation,
      selectedInterests: selectedInterests,
    };
    
    dispatch(setUserSearchCriteria(pars));
    // Storage.storeData('GENDER', mGender);
    // Storage.storeData('AGE', JSON.stringify(mAge));
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: 'Filter Apply successfully',
      });
      setShowLoader(false);
    }, 700);
  };

  const clickResetButton = () => {
    setShowLoader(true);
    let pars = {
      gender: '',
      age: '',
      location: '',
      setSelectedInterests: [],
    };
    setGender('');
    setSelectedInterests([]);
    setAge({minAge: 0, maxAge: 80});
    setLoction('India');
    dispatch(setUserSearchCriteria(pars));
    // Storage.storeData('GENDER', '');
    // Storage.storeData('AGE', '');
    setTimeout(() => {
      setShowLoader(false);
      Toast.show({
        type: 'success',
        text1: 'All filter removed successfully',
      });
    }, 700);
  };
  const selectUnselect = (selectId: Number) => {
    let itemIndex = selectedInterests.findIndex(itemId => itemId === selectId);
    if (itemIndex < 0) {
      setSelectedInterests([...selectedInterests, selectId]);
    } else {
      let copyArr = [...selectedInterests];
      copyArr?.splice(itemIndex, 1);
      setSelectedInterests(copyArr);
    }
  };
  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title="Search Criteria"
        onPress={() => navigation.goBack()}
      />
      <Loader Visible={showLoader} />
      <WrapComponent>
        <View>
          <Label textStyle={styles.label_txt} title={Strings.location} />
          <GooglePlacesAutocomplete
            // placeholder="Search"
            placeholder="India"
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            textInputProps={{
              // placeholderTextColor: Color.LIGHT_GREY,
              placeholderTextColor: Color.Black_Color,
              returnKeyType: 'search',
            }}
            query={{
              key: 'YOUR API KEY',
              language: 'en',
            }}
            styles={{
              textInputContainer: styles.google_Edit_Con,
              textInput: styles.google_Edit,
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              description: {
                color: '#000',
              },
            }}
          />
          {!showLoader && (
            <DropDownPick
              onClick={(item: string) => setGender(item?.value)}
              labelStyle={styles?.gender_Label}
              showStar={false}
              outerView={styles.dropDown_Outer}
              selectedValue={mGender}
            />
          )}
          <Label textStyle={styles.age_Label} title={Strings.age} />
          <View style={{width: '90%', marginHorizontal: '5%'}}>
            <Slider
              min={1}
              max={80}
              values={[mAge?.minAge, mAge?.maxAge]} // it takes array of min and max values
              onChange={(values: Number[]) => setAgeVal(values)}
              markerColor={Color?.Primary_Color}
              selectedTrackStyle={{
                borderColor: Color?.Primary_Color,
                borderWidth: 2,
              }}
              trackStyle={{
                backgroundColor: Color?.Black_Color,
                height: scale(3),
              }}
              labelTextStyle={{
                color: Color.Black_Color,
              }}
            />
          </View>
          <Label
            textStyle={styles.age_Label}
            title={Strings.selectYourInterest}
          />
          <View style={styles.itemWrap}>
            {InterestArray?.map((item, index) => {
              let active = selectedInterests?.includes(item?.id);
              return (
                <TouchableOpacity
                  key={index}
                  style={dynamicStyles(active).roundView}
                  onPress={() => selectUnselect(item?.id)}>
                  <Label
                    title={item?.name}
                    textStyle={dynamicStyles(active).txt_style}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </WrapComponent>
      <View style={styles.btn_box}>
        <CustomButton
          name={Strings.reset}
          btnStyle={{
            ...styles.btn,
            ...{
              backgroundColor: Color.Light_white,
              borderWidth: 0.9,
              borderColor: Color?.Button_Color,
              borderRadius: scale(50),
            },
          }}
          txtStyle={{color: Color?.Button_Color, fontWeight: '500'}}
          onPress={clickResetButton}
        />
        <CustomButton
          name={Strings.applyFilter}
          btnStyle={styles.btn}
          txtStyle={{color: Color?.White_Color, fontWeight: '500'}}
          onPress={clickApply}
        />
      </View>
    </View>
  );
};

export default SearchCriteria;
