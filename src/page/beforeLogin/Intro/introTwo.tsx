import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import Icon from '../../../util/Icon';
import Label from '../../../commonComponent/Label';
import Button from '../../../commonComponent/Button';
import { useNavigation } from '@react-navigation/native';
const IntroTwoLayout = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.main}>
      <View style={styles.intro2_Main}>
        <FastImage
          style={styles.intro2_Icon}
          source={Icon.Intro2}
          resizeMode="contain"
        />
      </View>
      <View style={styles.second_Child}>
        <Label
          textStyle={styles.intro_Label}
          title={`Don't wait anymore,find out`}
        />
        <View style={styles.title_Con}>
          <Label textStyle={styles.make_Label} title={'your'} />
          <Label textStyle={styles.friends_Label} title={'soul mate'} />
          <Label textStyle={styles.make_Label} title={'now'} />
        </View>
        <Label
          textStyle={styles.des_Label}
          title="Interact with people with the same"
        />
        <Label textStyle={styles.interest_Label} title="interest like you" />
        <Button
          buttonStyle={styles.skip_Button}
          textStyle={styles.skip_Label}
          title="Skip"
          onClick={() => navigation.navigate('Login')}
        />
        <Button
          buttonStyle={styles.next_Button}
          textStyle={styles.next_Label}
          title="Next"
          onClick={()=>navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default IntroTwoLayout;
