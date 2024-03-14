import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Strings,
  Icon,
  isEmailValid,
  CommonStyles,
  Loader,
  Color,
} from '@src/util';
import {
  EditText,
  Label,
  CustomButton,
  DropDownPick,
  SelectDateTime,
  HeaderGoToBack,
} from '@src/commonComponent';
import styles from './styles';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {updateProfile} from '@src/redux/LoginAction';
import { isAtLeast18YearsOld } from '@src/util/Validator';

interface ErrorState {
  isNameError: boolean;
  isPhoneError: boolean;
  isDobError: boolean;
  isEmailError: boolean;
  isLocError: boolean;
  isGenderError: boolean;
  isBioError: boolean;
}

interface userType {
  name: string;
  phone: string;
  dob: Date;
  email: string;
  loc: string;
  gender: string;
  bio: string;
  showLoader: boolean;
}

interface navigationProps {}

type stackParamsList = {
  Profile: {
    USER_ID: string;
  };
};

var subscriber: any = null;

const EditProfile = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const mRoute = useRoute<RouteProp<stackParamsList, 'Profile'>>();
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const [userData, setUserData] = useState<userType>({
    name: '',
    phone: '',
    dob: new Date(),
    email: '',
    loc: '',
    gender: '',
    bio: '',
    showLoader: true,
  });

  const [isError, setError] = useState<ErrorState>({
    isNameError: false,
    isPhoneError: false,
    isDobError: false,
    isEmailError: false,
    isLocError: false,
    isGenderError: false,
    isBioError: false,
  });
  const [errorMsg, setErrorMsg] = useState<string>();
  // state for Date Picker
  const [selectedDate, setDate] = useState<Date>(new Date());
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);

  //  Ref for Fields
  const phoneRef = useRef<TextInput>(null);
  const dobRef = useRef<TouchableOpacity>(null);
  const emailRef = useRef<TextInput>(null);
  const locRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);

  useEffect(() => {
    const {USER_ID} = mRoute.params;
    subscriber = firestore()
      .collection('Users')
      .doc(USER_ID)
      .onSnapshot((documentSnapshot: FirebaseFirestoreTypes.DocumentData) => {
        if (documentSnapshot?.data()) {
          const {EMAIL, NAME, PHONE, BIO, LOCATION, DOB, SEX} =
            documentSnapshot.data();
          setUserData(prevData => ({
            ...prevData,
            gender: SEX,
            email: EMAIL,
            name: NAME,
            phone: PHONE,
            dob: new Date(DOB.seconds * 1000 + DOB.nanoseconds / 1000000),
            loc: LOCATION,
            bio: BIO,
            showLoader: false,
          }));
        }
        setShowDate(true);
      });
    return () => subscriber;
  }, []);

  // Particular Field Method
  const enterName = (e: string) => {
    setUserData({...userData, name: e});
    setError({...isError, isNameError: false});
  };

  const enterPhone = (e: string) => {
    setUserData({...userData, phone: e.trim()});
    setError({...isError, isPhoneError: false});
  };

  const enterEmail = (e: string) => {
    setUserData({...userData, email: e.trim()});
    setError({...isError, isEmailError: false});
  };

  const enterBio = (e: string) => {
    setUserData({...userData, bio: e.trim()});
    setError({...isError, isBioError: false});
  };

  const enterLoc = (e: string) => {
    setUserData({...userData, loc: e.trim()});
    setError({...isError, isLocError: false});
  };

  // onSave button
  const _Next = () => {
    const {name, phone, email, gender, loc, bio, dob} = userData;
    if (!name?.trim()) {
      setError({...isError, isNameError: true});
      setErrorMsg(Strings.enterName);
    } else if (!phone?.trim()) {
      setError({...isError, isPhoneError: true});
      setErrorMsg(Strings?.enterPhone);
    } else if (phone?.length > 10 || phone?.length < 10) {
      setError({...isError, isPhoneError: true});
      setErrorMsg(Strings?.validPhone);
    } else if (!showDate) {
      setError({...isError, isDobError: true});
      setErrorMsg(Strings?.selectDob);
    } else if (!email?.trim()) {
    } else if (!isAtLeast18YearsOld(dob)) {
      setError({...isError, isDobError: true});
      setErrorMsg(Strings?.selectDobMin18);
    } else if (!email?.trim()) {
      setError({...isError, isEmailError: true});
      setErrorMsg(Strings?.enterEmail);
    } else if (!isEmailValid(email)) {
      setError({...isError, isEmailError: true});
      setErrorMsg(Strings?.enterValidEmail);
    } else if (!gender.trim()) {
      setError({...isError, isGenderError: true});
      setErrorMsg(Strings?.genderError);
    } else if (!loc?.trim()) {
      setError({...isError, isLocError: true});
      setErrorMsg(Strings?.enterLocation);
    } else if (!bio?.trim()) {
      setError({...isError, isBioError: true});
      setErrorMsg(Strings?.enterBio);
    } else {
      const {USER_ID} = mRoute.params;
      let pars = {
        BIO: userData.bio,
        DOB: userData.dob,
        EMAIL: userData.email,
        LOCATION: userData.loc,
        NAME: userData.name,
        PHONE: userData.phone,
        SEX: userData.gender,
        USER_ID: USER_ID,
      };
      dispatch(updateProfile(pars));
    }
  };

  const selectDate = (e: Date) => {
    setUserData(prevData => ({...prevData, dob: e}));
    setDate(e);
    setShowDateModal(false);
    setShowDate(true);
    setError({...isError, isDobError: false});
  };

  const getFormatedDate = () => {
    let mCheclk = new Date(userData.dob);
    let date = mCheclk.getDate();
    let month = mCheclk.getMonth() + 1;
    let year = mCheclk.getFullYear();
    return date + '-' + month + '-' + year;
  };

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title={Strings.editProfile}
        onPress={() => navigation?.goBack()}
      />
      <ScrollView style={styles.sub_Main} showsVerticalScrollIndicator={false}>
        <View style={styles.formView}>
          <Loader Visible={hideProgressBar} />
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings.fullName}
          />
          <EditText
            Value={userData?.name}
            OnChangeText={e => enterName(e)}
            OnSubmit={() => phoneRef?.current?.focus()}
            ReturnKeyType="next"
            Placholder={Strings?.name}
            outerBoxStyle={styles.outer_Con}
            Style={styles.edit}
          />
          {isError?.isNameError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings.phone}
          />
          <EditText
            Value={userData?.phone}
            inputRef={phoneRef}
            OnChangeText={e => enterPhone(e)}
            OnSubmit={() => Keyboard?.dismiss()}
            ReturnKeyType="next"
            Placholder={Strings?.phone}
            outerBoxStyle={styles.outer_Con}
            KeyboradType="numeric"
            Style={styles.edit}
          />
          {isError?.isPhoneError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings.dob}
          />
          <TouchableOpacity
            style={CommonStyles?.pick_box}
            onPress={() => setShowDateModal(true)}
            ref={dobRef}>
            {showDate ? (
              <Label
                title={getFormatedDate()}
                textStyle={styles.selected_Date_Label}
              />
            ) : (
              <Label title={Strings?.dob} textStyle={styles.dob_txt_style} />
            )}
          </TouchableOpacity>
          {isError?.isDobError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          {!userData?.showLoader && (
            <DropDownPick
              selectedValue={userData.gender.trim().toString()}
              onClick={(item: string) => {
                setError({...isError, isGenderError: false});
                setUserData({...userData, gender: item?.value});
              }}
              labelStyle={styles.field_txt}
              showStar
              outerView={styles.dropDown_Outer}
              titleStyle={styles.gender_Label}
            />
          )}
          {isError?.isGenderError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings.email}
          />
          <EditText
            Value={userData?.email}
            inputRef={emailRef}
            OnChangeText={e => enterEmail(e)}
            OnSubmit={() => locRef?.current?.focus()}
            ReturnKeyType="next"
            Placholder={Strings?.email}
            outerBoxStyle={styles.outer_Con}
            Editable={false}
            Style={styles.email_Edit}
          />
          {isError?.isEmailError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings?.location}
          />
          <EditText
            Value={userData?.loc}
            inputRef={locRef}
            OnChangeText={e => enterLoc(e)}
            OnSubmit={() => bioRef?.current?.focus()}
            ReturnKeyType="next"
            Placholder={Strings?.location}
            outerBoxStyle={styles.outer_Con}
            Style={styles.edit}
          />
          {isError?.isLocError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
          <Label
            textStyle={styles.field_txt}
            showStar={true}
            starStyle={styles.star_style}
            title={Strings?.bio}
          />
          <EditText
            Value={userData?.bio}
            inputRef={bioRef}
            OnChangeText={e => enterBio(e)}
            OnSubmit={() => Keyboard?.dismiss()}
            ReturnKeyType="done"
            Placholder={Strings?.bio}
            outerBoxStyle={styles.outer_Con}
            Style={styles.edit}
          />
          {isError?.isBioError && (
            <View style={styles.error_view}>
              <Image
                source={Icon?.ErrorLogo}
                resizeMode="contain"
                style={styles.errorLogo}
              />
              <Text style={styles.errorTxt}>{errorMsg}</Text>
            </View>
          )}
        </View>
        <CustomButton
          name={Strings?.save}
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={_Next}
        />
        <SelectDateTime
          date={userData.dob}
          open={showDateModal}
          onConfirm={date => selectDate(date)}
          onCancel={() => setShowDateModal(false)}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;
