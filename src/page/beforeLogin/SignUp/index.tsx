import React, {useState, FC, useRef} from 'react';
import {View, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import {scale} from 'react-native-size-matters';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {storeData} from '@src/service';
import {Color, Icon, isEmailValid, Loader, Strings} from '@src/util';
import auth from '@react-native-firebase/auth';

import {
  HeaderBeforeLogin,
  Label,
  EditText,
  CustomButton,
  WrapComponent,
} from '@src/commonComponent';
import styles from './styles';

interface navigationProps {
  Login: undefined;
  SelectCountry: {EMAIL: string; PASS: string | number};
}

interface userDataType {
  email: string;
  password: string;
  confirm: string;
  isCheck: boolean;
  isHidePassword: boolean;
  isHideConfrimPassword: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
  isConfirmError: boolean;
  errorMsg: string;
}

const SignUp: FC = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [data, setData] = useState<userDataType>({
    email: '',
    password: '',
    confirm: '',
    isCheck: false,
    isHidePassword: true,
    isHideConfrimPassword: true,
    isEmailError: false,
    isPasswordError: false,
    isConfirmError: false,
    errorMsg: '',
  });

  const passRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  // Sign In Function
  const _signUp = () => {
    const {email, password, confirm} = data;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasAlphanumeric = /[a-zA-Z0-9]/;
    Keyboard.dismiss();
    if (!email?.trim()) {
      setData({
        ...data,
        isEmailError: true,
        errorMsg: 'Please enter the Email',
      });
    } else if (!isEmailValid(email)) {
      setData({
        ...data,
        isEmailError: true,
        errorMsg: 'Please enter the Valid Email',
      });
    } else if (!password?.trim()) {
      setData({
        ...data,
        isPasswordError: true,
        errorMsg: 'Please enter the Password',
      });
    } else if (!confirm?.trim()) {
      setData({
        ...data,
        isConfirmError: true,
        errorMsg: 'Please enter the Confirm Password',
      });
    } else if (password !== confirm) {
      setData({
        ...data,
        isConfirmError: true,
        errorMsg: 'Both Password should match',
      });
    } else if (
      !hasSpecialChar.test(password) &&
      hasAlphanumeric.test(password)
    ) {
      setData({
        ...data,
        isConfirmError: true,
        errorMsg:
          'Password should contain at least one unique character and one Capital letter and one number. Like Test@123',
      });
    } else {
      setShowLoader(true);
      auth()
        .fetchSignInMethodsForEmail(email)
        .then(res => {
          if (res.length) {
            setData({
              ...data,
              isEmailError: true,
              errorMsg: 'Email already exists, Please try with another',
            });
          } else {
            navigation.navigate('SelectCountry', {
              EMAIL: email.trim(),
              PASS: password,
            });
          }
          setShowLoader(false);
        })
        .catch(Error => {});
    }
  };

  return (
    <WrapComponent>
      <View style={styles.main}>
        <HeaderBeforeLogin />
        <Loader Visible={showLoader} />
        <Label title={Strings?.letSignUp} textStyle={styles.heading_Txt} />
        <Label
          textStyle={styles.header_Label}
          showStar={true}
          starStyle={styles.header_Star}
          title={Strings.email}
        />
        <EditText
          Value={data.email}
          OnChangeText={e => {
            setData({...data, email: e.trim(), isEmailError: false});
          }}
          OnSubmit={() => passRef?.current?.focus()}
          ReturnKeyType="next"
          Placholder={Strings.enterEmail}
          showImg={Icon?.Mail}
        />
        {data?.isEmailError && (
          <View style={styles.error_view}>
            <AntDesign name="exclamationcircle" color={Color.Red_Color} />
            <Label textStyle={styles.errorTxt} title={data.errorMsg} />
          </View>
        )}
        <Label
          showStar={true}
          title={Strings.password}
          textStyle={styles.password_Label}
          starStyle={styles.pass_Star}
        />
        <EditText
          Value={data.password?.toString()}
          inputRef={passRef}
          OnChangeText={e => {
            setData({...data, password: e.trim(), isPasswordError: false});
          }}
          OnSubmit={() => confirmRef?.current?.focus()}
          ReturnKeyType="next"
          Placholder={Strings.enterPassword}
          showEye
          SecureText={data.isHidePassword}
          onClickSecure={() =>
            setData({...data, isHidePassword: !data.isHidePassword})
          }
        />
        {data?.isPasswordError && (
          <View style={styles.error_view}>
            <AntDesign name="exclamationcircle" color={Color.Red_Color} />
            <Label textStyle={styles.errorTxt} title={data?.errorMsg} />
          </View>
        )}
        <Label
          showStar={true}
          title={Strings.conpassword}
          textStyle={styles.conPass_Label}
          starStyle={styles.pass_Star}
        />
        <EditText
          Value={data.confirm?.toString()}
          inputRef={confirmRef}
          OnChangeText={e => {
            setData({...data, confirm: e.trim(), isConfirmError: false});
          }}
          OnSubmit={() => Keyboard?.dismiss()}
          ReturnKeyType="done"
          Placholder={Strings.enterConPassword}
          showEye
          SecureText={data.isHideConfrimPassword}
          onClickSecure={() =>
            setData({
              ...data,
              isHideConfrimPassword: !data.isHideConfrimPassword,
            })
          }
        />
        {data?.isConfirmError && (
          <View style={styles.error_view}>
            <AntDesign name="exclamationcircle" color={Color.Red_Color} />
            <Label textStyle={styles.errorTxt} title={data.errorMsg} />
          </View>
        )}
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => setData({...data, isCheck: !data.isCheck})}>
          <Check
            name={data.isCheck ? 'checkbox-outline' : 'checkbox-blank-outline'}
            size={scale(21)}
            color={Color.Primary_Color}
          />
          <Label title={Strings.rememberMe} textStyle={styles.remember_Txt} />
        </TouchableOpacity>
        <CustomButton
          name={Strings.signUp}
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={_signUp}
        />
        <View style={styles.rowView}>
          <Label title={Strings.alreadyAccount} textStyle={styles.normalTxt} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Label title={Strings.signIn} textStyle={styles.signIn_txt} />
          </TouchableOpacity>
        </View>
      </View>
    </WrapComponent>
  );
};

export default SignUp;
