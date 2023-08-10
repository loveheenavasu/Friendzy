import {Image, Keyboard, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import * as Storage from '@src/service';
import {useDispatch} from 'react-redux';
import {updatePassword} from '@src/redux/LoginAction';
import {Icon, Strings} from '@src/util';
import {
  EditText,
  Label,
  CustomButton,
  WrapComponent,
  HeaderGoToBack,
} from '@src/commonComponent';

import styles from './styles';

interface navigationProps {
  Congratulation: undefined;
}

interface userDateType {
  password: string;
  confirmPassword: string;
  isHidePassword: boolean;
  isHideConfrimPassword: boolean;
  isPasswordError: boolean;
  isConfirmError: boolean;
  errorMsg: string;
}

const ChangePassowrd = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const confirmRef = useRef(null);
  const [userID, setID] = useState<string>();
  const dispatch = useDispatch<any>();
  const [data, setData] = useState<userDateType>({
    password: '',
    confirmPassword: '',
    isHidePassword: true,
    isHideConfrimPassword: true,
    isPasswordError: false,
    isConfirmError: false,
    errorMsg: '',
  });

  useEffect(() => {
    Storage.retrieveData('USER_ID').then(id => {
      setID(id);
    });
  }, []);

  const _savePassword = () => {
    const {password, confirmPassword} = data;
    if (!password?.trim()) {
      setData({
        ...data,
        isPasswordError: true,
        errorMsg: 'Please enter the Password',
      });
    } else if (!confirmPassword?.trim()) {
      setData({
        ...data,
        isConfirmError: true,
        errorMsg: 'Please enter the Confirm Password',
      });
    } else if (password !== confirmPassword) {
      setData({
        ...data,
        isConfirmError: true,
        errorMsg: 'Both Password should match',
      });
    } else {
      let pars = {
        USER_ID: userID ?? '',
        newPassword: confirmPassword,
      };
      dispatch(updatePassword(pars));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.main}>
      <HeaderGoToBack
        title="Set password"
        onPress={() => navigation?.goBack()}
      />
      <WrapComponent>
        <Image
          source={Icon?.NewPassLogo}
          resizeMode="contain"
          style={styles.img}
        />
        <Label
          title={Strings.newPassword}
          showStar={true}
          textStyle={styles.password_Label}
        />
        <EditText
          Value={data.password}
          inputRef={confirmRef}
          OnChangeText={e =>
            setData({...data, password: e.trim(), isPasswordError: false})
          }
          OnSubmit={() => Keyboard?.dismiss()}
          ReturnKeyType="done"
          Placholder="Please enter new password"
          showEye
          SecureText={data.isHidePassword}
          onClickSecure={() =>
            setData({...data, isHidePassword: !data.isHidePassword})
          }
        />
        {data?.isPasswordError && (
          <View style={styles.error_view}>
            <Image
              source={Icon?.ErrorLogo}
              resizeMode="contain"
              style={styles.errorLogo}
            />
            <Label title={data.errorMsg} textStyle={styles.errorTxt} />
          </View>
        )}
        <Label
          title={Strings.confirmNewPassword}
          showStar={true}
          textStyle={styles.create_Password_Label}
          starStyle={styles.create_P_Star}
        />
        <EditText
          Value={data.confirmPassword}
          inputRef={confirmRef}
          OnChangeText={e =>
            setData({...data, confirmPassword: e.trim(), isConfirmError: false})
          }
          OnSubmit={() => Keyboard?.dismiss()}
          ReturnKeyType="done"
          Placholder="Please enter cofirm password"
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
            <Image
              source={Icon?.ErrorLogo}
              resizeMode="contain"
              style={styles.errorLogo}
            />
            <Label textStyle={styles.errorTxt} title={data.errorMsg} />
          </View>
        )}
        <CustomButton
          name="Save"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={_savePassword}
        />
      </WrapComponent>
    </View>
  );
};

export default ChangePassowrd;
