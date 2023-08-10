import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Slider from 'react-native-a11y-slider';
import {useNavigation} from '@react-navigation/native';
import {CommonStyles, Color, Strings, Loader} from '@src/util';
import {
  HeaderGoToBack,
  Label,
  WrapComponent,
  CustomButton,
  DropDownPick,
} from '@src/commonComponent';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSearchCriteria} from '@src/redux/LoginAction';
import {RootState} from '@src/store';
import * as Storage from '@src/service';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

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
  const [loc, setLoc] = useState<string>('');
  const [mGender, setGender] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [mAge, setAge] = useState<ageVal>({
    minAge: 0,
    maxAge: 79,
  });

  useEffect(() => {
    setShowLoader(true);
    Storage.retrieveData('GENDER').then(res => {
      setGender(res ?? '');
      setShowLoader(false);
    });

    Storage.retrieveData('AGE').then(res => {
      setShowLoader(false);
      if (res) {
        let age = JSON.parse(res);
        setAge({minAge: age?.minAge, maxAge: age?.maxAge});
      }
    });
  }, []);

  const setAgeVal = (ageArr: Number[]) => {
    const [min, max] = ageArr;
    setAge({...mAge, minAge: min, maxAge: max});
  };

  const clickApply = () => {
    setShowLoader(true);
    let pars = {
      gender: mGender,
      age: mAge,
      location: loc,
    };
    dispatch(setUserSearchCriteria(pars));
    Storage.storeData('GENDER', mGender);
    Storage.storeData('AGE', JSON.stringify(mAge));
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
    };
    setGender('');
    dispatch(setUserSearchCriteria(pars));
    Storage.storeData('GENDER', '');
    Storage.storeData('AGE', '');
    setAge({minAge: 0, maxAge: 80});
    setTimeout(() => {
      setShowLoader(false);
      Toast.show({
        type: 'success',
        text1: 'All filter removed successfully',
      });
    }, 700);
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
            placeholder="Search"
            onPress={(data, details = null) => {
              console.log(data, details);
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
            />
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
