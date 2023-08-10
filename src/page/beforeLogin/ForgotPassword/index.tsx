import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Color from '../../../util/Color';
import HeaderGoToBack from '../../../commonComponent/HeaderGoToBack';
import {scale, verticalScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import Icon from '../../../util/Icon';
import Label from '../../../commonComponent/Label';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../../commonComponent/CustomButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import WrapComponent from '../../../commonComponent/WrapComponent';

const DummyData = [
  {id: 1, txt1: 'via Sms', txt2: '+7565****90', name: 'chat'},
  {id: 2, txt1: 'via Email', txt2: 'Ex****zestDanish@.com', name: 'email'},
];

interface navigationProps {
  Otp: undefined;
}

const ForgotPassword: FC = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const [ID, setId] = useState<number>();

  return (
    <View style={styles.main}>
      <HeaderGoToBack
        title="Forgot Password"
        onPress={() => navigation?.goBack()}
      />
      <WrapComponent>
        <FastImage
          source={Icon?.ForgotPassICon}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.logo}
        />
        <Label
          title="Select which contact should we use to reset your password"
          textStyle={styles.heading_txt}
        />
        <View style={styles.DetailsView}>
          {DummyData?.map((item, index) => {
            return (
              <TouchableOpacity
                style={[
                  styles.DetailBox,
                  ID == item?.id && {
                    borderColor: Color?.Primary_Color,
                    borderWidth: 0.9,
                  },
                ]}
                key={item?.id}
                onPress={() => setId(item?.id)}>
                <View style={styles.circle}>
                  <MatIcon
                    name={item?.name}
                    size={30}
                    color={Color?.Primary_Color}
                  />
                </View>
                <View style={styles.infoBox}>
                  <Label title={item?.txt1} textStyle={styles?.txt1_style} />
                  <Label title={item?.txt2} textStyle={styles?.txt2_style} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <CustomButton
          name="Continue"
          btnStyle={styles.btnStyle}
          txtStyle={styles.txtStyle}
          onPress={() => navigation?.navigate('Otp')}
        />
      </WrapComponent>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.White_Color,
    flex: 1,
    paddingHorizontal: scale(8),
  },
  logo: {
    width: scale(300),
    height: scale(214),
    alignSelf: 'center',
  },
  heading_txt: {
    fontSize: scale(12),
    fontWeight: '400',
    color: Color?.Grey_Color,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  DetailsView: {
    marginTop: scale(10),
  },
  DetailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(6),
    paddingVertical: scale(13),
    elevation: 3,
    backgroundColor: Color.Light_white,
    borderRadius: scale(7),
    paddingHorizontal: scale(9),
  },
  circle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: Color?.Error_View_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    marginLeft: scale(10),
  },
  txt1_style: {
    fontSize: scale(14),
    fontWeight: '400',
    color: Color?.Grey_Color,
  },
  txt2_style: {
    fontSize: scale(14),
    fontWeight: '500',
    color: Color?.Black_Color,
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
