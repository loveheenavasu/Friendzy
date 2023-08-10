import React, {FC, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from '../../../util/Icon';
import Label from '../../../commonComponent/Label';
import Button from '../../../commonComponent/Button';
import styles from './styles';
import IntroTwoLayout from './introTwo';
import {useNavigation} from '@react-navigation/native';

const Intro: FC = () => {
  const [showSecond, setShowSecond] = useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <>
      {showSecond ? (
        <IntroTwoLayout />
      ) : (
        <View style={styles.main}>
          <FastImage
            style={styles.back_Icon}
            source={Icon.Intro}
            resizeMode="contain"
          />
          <View style={styles.second_Child}>
            <View style={styles.title_Con}>
              <Label textStyle={styles.make_Label} title="Make" />
              <Label textStyle={styles.friends_Label} title="friends" />
              <Label textStyle={styles.make_Label} title="with the" />
              <Label textStyle={styles.make_Label} title="people like you" />
            </View>
            <Label
              textStyle={styles.des_Label}
              title="Interact with people with the same"
            />
            <Label
              textStyle={styles.interest_Label}
              title="interest like you"
            />
            <Button
              buttonStyle={styles.skip_Button}
              textStyle={styles.skip_Label}
              title="Skip"
              onClick={() => navigation?.navigate('Login')}
            />
            <Button
              buttonStyle={styles.next_Button}
              textStyle={styles.next_Label}
              title="Next"
              onClick={() => setShowSecond(true)}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Intro;
