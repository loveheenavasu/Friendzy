import React, {useState, FC, useRef} from 'react';
import {View, Keyboard, Text, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {hitLoginApi} from '../../../redux/LoginAction';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {
  Label,
  EditText,
  HeaderBeforeLogin,
  WrapComponent,
} from '@src/commonComponent';
import {Icon, isEmailValid, Color, Strings, Loader} from '@src/util';
import styles from './styles';
import LayoutTwo from './LayoutTwo';

interface userDateType {
  email: string;
  password: string;
  isCheck: boolean;
  isHidePassword: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
  errorMsg: string;
}

interface navigationProps {
  SignUp: undefined;
  Profile: undefined;
}

const Login: FC = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );

  const [data, setData] = useState<userDateType>({
    email: '',
    password: '',
    isCheck: false,
    isHidePassword: true,
    isEmailError: false,
    isPasswordError: false,
    errorMsg: '',
  });

  const passRef = useRef<TextInput>(null);
  // Sign In Function
  const _signIn = () => {
    const {email, password} = data;
    if (!email?.trim()) {
      setData({...data, isEmailError: true, errorMsg: Strings.enterEmail});
    } else if (!isEmailValid(email)) {
      setData({...data, isEmailError: true, errorMsg: Strings.enterValidEmail});
    } else if (!password?.trim()) {
      setData({
        ...data,
        isPasswordError: true,
        errorMsg: Strings.enterPassword,
      });
    } else {
      let pars = {email: email, password: password};
      dispatch(hitLoginApi(pars));
    }
  };

  return (
    <WrapComponent>
      <View style={styles.main}>
        <HeaderBeforeLogin />
        <Loader Visible={hideProgressBar} />
        <Label title={Strings.letSignIn} textStyle={styles.heading_Txt} />
        <View style={styles.main_Second}>
          <Label
            textStyle={styles.email_Label}
            showStar={true}
            title={Strings.email}
          />
          <EditText
            Value={data.email}
            OnChangeText={e => {
              setData({...data, email: e.trim(), isEmailError: false});
            }}
            OnSubmit={() => passRef?.current?.focus()}
            Placholder={Strings.enterEmail}
            showImg={Icon?.Mail}
            ReturnKeyType="next"
          />
          {data?.isEmailError && (
            <View style={styles.error_view}>
              <AntDesign name="exclamationcircle" color={Color.Red_Color} />
              <Text style={styles.errorTxt}>{data.errorMsg}</Text>
            </View>
          )}
          <Label
            showStar={true}
            title={Strings.password}
            textStyle={styles.password_Label}
            starStyle={styles.password_Star}
          />
          <EditText
            Value={data.password}
            inputRef={passRef}
            OnChangeText={e => {
              setData({...data, password: e.trim(), isPasswordError: false});
            }}
            OnSubmit={() => Keyboard?.dismiss()}
            ReturnKeyType="done"
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
              <Text style={styles.errorTxt}>{data.errorMsg}</Text>
            </View>
          )}
          <LayoutTwo
            clickCheckBox={() => setData({...data, isCheck: !data.isCheck})}
            isCheck={data.isCheck}
            clickSignIn={_signIn}
            clickSignUp={() => navigation?.navigate('SignUp')}
            // clickForgot={() => navigation?.navigate('Forget')}
          />
        </View>
      </View>
    </WrapComponent>
  );
};
export default Login;
