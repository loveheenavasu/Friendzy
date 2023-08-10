import React, {FC, ReactNode} from 'react';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Color from '../../util/Color';
import {verticalScale} from 'react-native-size-matters';

interface WrapComponentProps {
  children: ReactNode;
}

const WrapComponent: FC<WrapComponentProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Color.White_Color}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? verticalScale(50) : 0}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: verticalScale(100),
        }}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WrapComponent;
