import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from '../../util/Icon';
import {useNavigation} from '@react-navigation/native';
import Label from '../Label';
import {Color} from '@src/util';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';

const HomeHeader = () => {
  const navigation = useNavigation<any>();
  const {notificationCount} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  return (
    <View style={styles.main}>
      <FastImage
        style={styles.logo}
        source={Icon.HeaderLogo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <FastImage
          style={styles.bell_Icon}
          source={Icon.BellIcon}
          resizeMode="contain"
        />
        {notificationCount > 0 && (
          <View style={styles.cir_Con}>
            <Label
              title={notificationCount.toString()}
              textStyle={styles.number_Label}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: scale(90),
    height: verticalScale(50),
  },
  bell_Icon: {
    width: scale(25),
    height: scale(25),
  },
  cir_Con: {
    width: scale(16),
    height: scale(16),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 3,
    alignSelf: 'center',
  },
  number_Label: {
    color: Color.White_Color,
    fontSize: scale(10),
  },
});

export default HomeHeader;
