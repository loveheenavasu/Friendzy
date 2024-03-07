import React, {FC, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from '../../util/Icon';
import {useNavigation} from '@react-navigation/native';
import Label from '../Label';
import {Color} from '@src/util';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// interface propTypes {
//   isHeart: boolean;
// }

const HomeHeader: FC = () => {
  // console.log("--HomeHeader---isHeart---->", isHeart);

  const navigation = useNavigation<any>();
  const {notificationCount, likedCount} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  return (
    <View style={styles.main}>
      <FastImage
        style={styles.logo}
        source={Icon.HeaderLogo}
        resizeMode="contain"
      />

      {likedCount ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('HeartLikeScreen')}
          style={styles.heartIcon}>
          <View style={styles.likeCountStyle}>
            <Label title={likedCount} textStyle={styles.txtStyle} />
          </View>

          <FontAwesome
            name="heart"
            color={Color.Primary_Color}
            size={scale(26)}
          />
        </TouchableOpacity>
      ) : null}
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
  heartIcon: {
    marginLeft: scale(120),
  },
  likeCountStyle: {
    backgroundColor: '#FF6E4F',
    borderRadius: scale(50),
    height:scale(17),
    width:scale(15),
    position: 'absolute',
    right: scale(-6),
    top: scale(-5),
    padding:scale(2),
    zIndex: 999,
    justifyContent:'center',
    alignItems:'center'


  },
  txtStyle: {
    color: 'white',
    fontSize: scale(12),
  },
});

export default HomeHeader;
