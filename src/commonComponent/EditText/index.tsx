import {
  View,
  StyleSheet,
  TextInput,
  ViewStyle,
  Image,
  TouchableOpacity,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React, {FC} from 'react';
import {scale} from 'react-native-size-matters';
import Color from '../../util/Color';
import Icon from '../../util/Icon';
import Eye from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  Placholder?: string;
  Value: string;
  Style?: TextStyle;
  OnChangeText?: (txt: any) => void;
  KeyboradType?: KeyboardTypeOptions | undefined;
  inputRef?: any;
  ReturnKeyType?: 'default' | 'go' | 'google' | 'next' | 'done';
  OnSubmit?(): void;
  showImg?: string;
  showEye?: boolean;
  onClickSecure?: () => void;
  SecureText?: boolean;
  outerBoxStyle?: ViewStyle;
  multiline?: boolean;
  Editable?: boolean | true;
  Maxlength?: number;
}

const EditText: FC<Props> = ({
  Placholder,
  Value,
  OnChangeText,
  Style,
  inputRef,
  ReturnKeyType,
  OnSubmit,
  KeyboradType,
  showImg,
  showEye,
  onClickSecure,
  SecureText,
  outerBoxStyle,
  multiline,
  Editable,
  Maxlength,
}) => {
  return (
    <>
      <View style={[styles.inputBox, {...outerBoxStyle}]}>
        <TextInput
          ref={inputRef}
          placeholder={Placholder}
          value={Value}
          onChangeText={OnChangeText}
          style={[styles.main, {...Style}]}
          returnKeyType={ReturnKeyType}
          onSubmitEditing={OnSubmit}
          blurOnSubmit={false}
          keyboardType={KeyboradType}
          autoFocus={false}
          secureTextEntry={SecureText}
          placeholderTextColor={Color?.LIGHT_GREY}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          editable={Editable}
          maxLength={Maxlength}
        />

        {showImg && (
          <View style={styles.imgBox}>
            {/* <Image
              source={showImg}
              resizeMode="contain"
              style={styles.iconLogo}
            /> */}
            <Ionicons name="mail" color={Color.Grey_Color} size={scale(20)} />
          </View>
        )}
        {showEye && (
          <TouchableOpacity style={styles.eyeBox} onPress={onClickSecure}>
            {SecureText ? (
              <Eye name="eye-off" size={21} color='black'/>
            ) : (
              <Eye name="eye" size={21} color='black'/>
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: scale(13),
    flex: 1,
    color: Color?.Black_Color,
  },
  inputBox: {
    flexDirection: 'row',
    paddingLeft: scale(15),
    paddingRight: scale(5),
    borderWidth: scale(0.6),
    width: '100%',
    height: scale(45),
    borderRadius: scale(24),
    borderColor: Color?.LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLogo: {
    height: scale(13),
    width: scale(16),
  },
  imgBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  eyeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(6),
  },
  eyeOpen: {
    height: scale(13),
    width: scale(20),
  },
});

export default EditText;
