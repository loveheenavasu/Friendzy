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
import {retrieveData} from '@src/service';
import {Strings, Icon, isEmailValid, CommonStyles} from '@src/util';
import {
  EditText,
  Label,
  CustomButton,
  DropDownPick,
  SelectDateTime,
  HeaderGoToBack,
} from '@src/commonComponent';
import styles from './styles';

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
  dob: Date | string;
  email: string;
  loc: string;
  gender: string;
  bio: string;
}

interface navigationProps {
  AddPhotos: {
    NAME: string;
    PHONE: string;
    DOB: Date | string;
    SEX: string;
    LOCATION: string;
    BIO: string | number;
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
  };
}

type stackParamsList = {
  Profile: {
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
  };
};

const Profile = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const mRoute = useRoute<RouteProp<stackParamsList, 'Profile'>>();
  const [userData, setUserData] = useState<userType>({
    name: '',
    phone: '',
    dob: '',
    email: '',
    loc: '',
    gender: '',
    bio: '',
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
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  //  Ref for Fields
  const phoneRef = useRef<TextInput>(null);
  const dobRef = useRef<TouchableOpacity>(null);
  const emailRef = useRef<TextInput>(null);
  const locRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);

  useEffect(() => {
    const {EMAIL} = mRoute.params;
    setUserData({...userData, email: EMAIL});
  }, []);

  // Particular Field Method
  const enterName = (e: string) => {
    setUserData({...userData, name: e.replace(/[^a-z A-Z]/g, '')});
    setError({...isError, isNameError: false});
  };

  const enterPhone = (e: string) => {
    setUserData({...userData, phone: e.replace(/[^0-9]/g, '').trim()});
    setError({...isError, isPhoneError: false});
  };

  const enterEmail = (e: string) => {
    setUserData({...userData, email: e.trim()});
    setError({...isError, isEmailError: false});
  };

  const enterBio = (e: string) => {
    setUserData({...userData, bio: e});
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
    } else if (!show) {
      setError({...isError, isDobError: true});
      setErrorMsg(Strings?.selectDob);
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
      const newRoute = {
        ...mRoute.params,
        NAME: name,
        PHONE: phone,
        DOB: dob,
        SEX: gender,
        LOCATION: loc,
        BIO: bio,
      };
      navigation?.navigate('AddPhotos', newRoute);
    }
  };

  const selectDate = (e: Date) => {
    setDate(e);
    setOpen(false);
    setShow(true);
    setError({...isError, isDobError: false});
  };

  const getFormatedDate = () => {
    const dateString = date?.toISOString();
    const onlyDate = dateString?.split('T')[0];
    const formatDate = onlyDate
      .split('-')
      .reverse()
      .join()
      .replaceAll(',', '-');
    return formatDate;
  };
  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack title="Profile" onPress={() => navigation?.goBack()} />
      <ScrollView style={styles.sub_Main} showsVerticalScrollIndicator={false}>
        <View style={styles.formView}>
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
            Maxlength={12}
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
            onPress={() => setOpen(true)}
            ref={dobRef}>
            {show ? (
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

          <DropDownPick
            onClick={(item: string) => {
              setError({...isError, isGenderError: false});
              setUserData({...userData, gender: item?.value});
            }}
            labelStyle={styles.field_txt}
            showStar
            outerView={styles.dropDown_Outer}
            titleStyle={styles.gender_Label}
          />
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
          name={Strings?.next}
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={_Next}
        />
        <SelectDateTime
          date={date}
          open={isOpen}
          onConfirm={date => {
            setUserData(prevData => ({...prevData, dob: date}));
            selectDate(date);
          }} // Add onConfirm and onCancel handlers if needed
          onCancel={() => setOpen(false)}
        />
      </ScrollView>
    </View>
  );
};

export default Profile;
