import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from '../../../util/Icon';
import {scale, verticalScale} from 'react-native-size-matters';
import Label from '../../../commonComponent/Label';
import Color from '../../../util/Color';
import CustomButton from '../../../commonComponent/CustomButton';
import strings from '../../../util/Localization/string';
import {useNavigation} from '@react-navigation/native';

const Congratulation = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={Icon?.CongratulationBackground}
      style={styles.main}
      resizeMode="contain">
      <View style={styles.row}>
        <Image
          source={Icon?.ChatLogoPink}
          resizeMode="contain"
          style={styles.logo}
        />
        <Image source={Icon?.AppLogoPink} resizeMode="contain" />
      </View>
      <Label title="Congratulations!" textStyle={styles.cong_text} />
      <Label
        title="Your account is ready to use"
        textStyle={styles.ready_txt}
      />
      <CustomButton
        name={strings.goToHomePage}
        btnStyle={styles.btnStyle}
        txtStyle={styles.txtStyle}
        onPress={() => navigation?.navigate('Login')}
      />
    </ImageBackground>
  );
};

export default Congratulation;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginRight: scale(12),
  },
  cong_text: {
    fontSize: scale(36),
    fontWeight: '700',
    color: Color?.Primary_Color,
    alignSelf: 'center',
    marginTop: verticalScale(17),
  },
  ready_txt: {
    fontSize: scale(16),
    fontWeight: '500',
    color: Color?.Grey_Color,
    alignSelf: 'center',
    marginTop: verticalScale(34),
  },
  btnStyle: {
    paddingVertical: scale(15),
    borderRadius: scale(21),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(10),
    width: '95%',
    position: 'absolute',
    bottom: 0,
  },
  txtStyle: {
    fontWeight: '700',
    fontSize: scale(16),
    color: Color?.White_Color,
  },
});
