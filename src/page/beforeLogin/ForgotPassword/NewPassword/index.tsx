import {Image, Keyboard, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Color from '../../../../util/Color';
import {scale, verticalScale} from 'react-native-size-matters';
import HeaderGoToBack from '../../../../commonComponent/HeaderGoToBack';
import Icon from '../../../../util/Icon';
import Label from '../../../../commonComponent/Label';
import EditText from '../../../../commonComponent/EditText';
import CustomButton from '../../../../commonComponent/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import WrapComponent from '../../../../commonComponent/WrapComponent';
import strings from '../../../../util/Localization/string';

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

const NewPassword = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const confirmRef = useRef('');
  const [data, setData] = useState<userDateType>({
    password: '',
    confirmPassword: '',
    isHidePassword: true,
    isHideConfrimPassword: true,
    isPasswordError: false,
    isConfirmError: false,
    errorMsg: '',
  });

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
      navigation?.navigate('Congratulation');
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
          title={strings.newPassword}
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
          title={strings.confirmNewPassword}
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

export default NewPassword;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
    paddingHorizontal: scale(10),
  },
  img: {
    alignSelf: 'center',
    marginBottom: verticalScale(20),
  },
  error_view: {
    paddingVertical: scale(8),
    backgroundColor: Color?.Error_View_Color,
    opacity: 0.5,
    borderRadius: scale(17),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  errorTxt: {
    color: Color?.Error_Color,
    fontSize: scale(9),
    fontWeight: '500',
    marginLeft: scale(10),
  },
  errorLogo: {
    width: scale(12),
    height: scale(12),
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
  password_Label: {
    marginLeft: scale(10),
    marginBottom: verticalScale(5),
  },
  create_Password_Label: {
    marginLeft: scale(10),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  create_P_Star: {
    marginTop: verticalScale(20),
  },
});
