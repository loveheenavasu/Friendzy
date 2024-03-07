import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CommonStyles, InterestArray, Strings, Icon, Loader, Color} from '@src/util';
import {Label, HeaderGoToBack, CustomButton, DropDownPick, WrapComponent} from '@src/commonComponent';
import {dynamicStyles, styles} from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {updateProfilePic} from '@src/redux/LoginAction';
import Slider from 'react-native-a11y-slider';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { scale } from 'react-native-size-matters';

interface ageVal {
  minAge: Number;
  maxAge: Number;
}

type stackParamsList = {
  SelectInterest: {
    NAME: string;
    PHONE: string;
    DOB: string | number;
    SEX: string;
    LOCATION: string;
    BIO: string | number;
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
    FILE: string | Object[];
  };
};

const SelectInterest: FC = () => {
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );

  const mRoute = useRoute<RouteProp<stackParamsList, 'SelectInterest'>>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<Number[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(hideProgressBar);
  const [mGender, setGender] = useState<string>('');
  const [mAge, setAge] = useState<ageVal>({
    minAge: 0,
    maxAge: 79,
  });
  const [mLocation, setLocation] = useState('India')
  const [disabled, setDisabled] = useState<boolean>(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();

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
  const showModal = async () => {
    const {EMAIL, PASS, FILE} = mRoute.params;
    const newInterests = {
      mLocation,selectedInterests,mGender,mAge
    }
    setShowLoader(true);
    setModalVisible(true);

    const createUser = await auth().createUserWithEmailAndPassword(
      EMAIL,
      PASS.toString(),
      );
    
    const token = await messaging().getToken();
    const storeUser = await firestore()
      .collection('Users')
      .doc(createUser?.user?.uid)
      .set({
        ...mRoute.params,
        SEARCH_CRITERIA:newInterests,
        TOKEN: token,
        USER_ID: createUser?.user?.uid,
      });

    for (let index = 0; index < FILE.length; index++) {
      let pars = {
        uploadUri: FILE[index]?.uploadUri,
        userId: createUser?.user?.uid,
        filename: FILE[index].filename,
      };

      dispatch(updateProfilePic(pars));
    }
    setModalVisible(false);
  };

  const setAgeVal = (ageArr: Number[]) => {
    const [min, max] = ageArr;
    setAge({...mAge, minAge: min, maxAge: max});
  };
  useEffect(() => {
    // Check if any of the required fields are empty
    if (!mLocation.trim() || !mGender.trim() || selectedInterests.length === 0) {
      setDisabled(true); // Disable the button
    } else {
      setDisabled(false); // Enable the button
    }
  }, [mLocation, mGender, selectedInterests]);

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title={Strings?.selectYourInterest}
        onPress={() => navigation.goBack()}
      />
      <Label title={Strings?.selectText} textStyle={styles.txt} />
      <Loader Visible={showLoader} />
      {/* <ScrollView>
        <View style={styles.itemWrap}>
          {InterestArray?.map((item, index) => {
            let active = selectedArr?.includes(item?.id);
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
      </ScrollView> */}
      <WrapComponent>
        <View>
          <Label textStyle={styles.label_txt} title={Strings.location} />
          {/* setting the location for india for temoporary basis as dont have the api key */}
          <View pointerEvents='none'>

          <GooglePlacesAutocomplete
            // placeholder="Search"
            placeholder='India'
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
          </View>

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
                color:Color.Black_Color
              }}
            />
          </View>
          <Label textStyle={styles.age_Label} title={Strings.selectYourInterest} />
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
      <CustomButton
        name={Strings?.save}
        btnStyle={[CommonStyles?.btnStyle, {
          backgroundColor:disabled?Color.LIGHT_GREY:Color.Button_Color
        }]}
        txtStyle={CommonStyles?.txtStyle}
        onPress={() => showModal()}
        disabled={disabled}
        />
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.35}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modal_outerview}>
          <View style={styles.modal_innerView}>
            <FastImage
              source={Icon?.SuccessAccount}
              resizeMode="contain"
              style={styles?.img}
            />
            <Label title={Strings?.great} textStyle={styles.big_txt} />
            <Label
              title={Strings?.accountSuccess}
              textStyle={styles.small_txt}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectInterest;
