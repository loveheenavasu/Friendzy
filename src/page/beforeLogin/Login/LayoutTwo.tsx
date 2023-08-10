import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Label from '../../../commonComponent/Label';
import CustomButton from '../../../commonComponent/CustomButton';
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from '../../../util/Icon';
import Color from '../../../util/Color';
import {scale} from 'react-native-size-matters';
import strings from '../../../util/Localization/string';

interface Props {
  isCheck?: boolean;
  clickCheckBox?: () => void;
  clickSignIn?: () => void;
  clickSignUp?: () => void;
  clickForgot?: () => void;
}

const LayoutTwo: FC<Props> = ({
  isCheck,
  clickCheckBox,
  clickSignIn,
  clickSignUp,
  clickForgot,
}) => {
  return (
    <>
      <View style={styles.forgot_View}>
        <TouchableOpacity onPress={clickCheckBox} style={styles.check_Con}>
          <Check
            name={isCheck ? 'checkbox-outline' : 'checkbox-blank-outline'}
            size={scale(21)}
            color={Color.Primary_Color}
          />
          <Label title={strings.rememberMe} textStyle={styles.remember_Txt} />
        </TouchableOpacity>
        <TouchableOpacity onPress={clickForgot}>
          <Label title={strings.forgetPassword} textStyle={styles.forget_txt} />
        </TouchableOpacity>
      </View>
      <CustomButton
        name={strings.signIn}
        btnStyle={styles.btnStyle}
        txtStyle={styles.txtStyle}
        onPress={clickSignIn}
      />
      <CustomButton
        name={strings.signUp}
        btnStyle={styles.signUp_btnStyle}
        txtStyle={styles.signUp_txtStyle}
        onPress={clickSignUp}
      />
      <Label title={strings.usingEmail} textStyle={styles.normalTxt} />
      <View style={styles.rowView}>
        <CustomButton
          name={strings.logInGoogle}
          btnStyle={styles.googleApple_Btn}
          rightLogo={Icon?.GoogleLogo}
          txtStyle={styles.btnTxt}
        />
        <CustomButton
          name={strings.logInApple}
          btnStyle={styles.googleApple_Btn}
          rightLogo={Icon?.AppleLogo}
          txtStyle={styles.btnTxt}
        />
      </View>
    </>
  );
};

export default LayoutTwo;
