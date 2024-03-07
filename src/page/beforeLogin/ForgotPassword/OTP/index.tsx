import React, {useRef, useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Color from '../../../../util/Color';
import HeaderGoToBack from '../../../../commonComponent/HeaderGoToBack';
import WrapComponent from '../../../../commonComponent/WrapComponent';
import Label from '../../../../commonComponent/Label';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import strings from '../../../../util/Localization/string';
import CustomButton from '../../../../commonComponent/CustomButton';

interface navigationProps {
  NewPass: undefined;
}

const OTP = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const [otp, setOtp] = useState(
    Array.from({length: 4}, () => {
      ('');
    }),
  );
  const mTextRef = useRef([]);

  return (
    <View style={styles.main}>
      <HeaderGoToBack
        title={strings.verifyCode}
        onPress={() => navigation.goBack()}
      />
      <WrapComponent>
        <Label title={strings.codeSent + '+33'} textStyle={styles.txt} />
        <Label title="234 556 7888 via SMS" textStyle={styles.phone_Label} />
        <View style={styles.otp_Main}>
          {otp.map((item, index) => (
            <View key={index} style={styles.otp_Con}>
              <TextInput
                autoFocus={false}
                ref={ref => (mTextRef.current[index] = ref)}
                style={styles.edit}
                textAlign="center"
                placeholder=""
                keyboardType="numeric"
                maxLength={1}
                // onChangeText={text => handleOtpChange(text.trim(), index)}
                // value={otp[index]}
                onKeyPress={key => {
                  if (key.nativeEvent?.key == 'Backspace') {
                    mTextRef.current[index - 1]?.focus();
                  } else if (key.nativeEvent?.key.length >= 1) {
                    mTextRef.current[index + 1]?.focus();
                  }
                }}
              />
            </View>
          ))}
        </View>
        <Label title={strings.resendCode} textStyle={styles.resend_Label} />
        <CustomButton
          name={strings.continue}
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => navigation?.navigate('NewPass')}
        />
      </WrapComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
    paddingHorizontal: scale(10),
  },
  txt: {
    fontSize: scale(15),
    color: Color?.Grey_Color,
    fontWeight: '400',
    marginTop: verticalScale(100),
    alignSelf: 'center',
    opacity: 0.6,
  },
  phone_Label: {
    fontSize: scale(15),
    color: Color?.Grey_Color,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: verticalScale(5),
    opacity: 0.6,
  },
  otp_Main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(30),
  },
  otp_Con: {
    marginRight: scale(10),
  },
  edit: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEF3',
    color:Color?.Black_Color
  },
  resend_Label: {
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontSize: scale(12),
    color: Color?.Grey_Color,
    fontWeight: '400',
    opacity: 0.6,
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(30),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(40),
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
});

export default OTP;
