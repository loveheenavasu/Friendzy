import { ActivityIndicator, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HeaderGoToBack } from '@src/commonComponent'
import { useNavigation } from '@react-navigation/native'
import { Color, Strings } from '@src/util'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedProfile } from '@src/redux/LoginAction'
import { RootState } from '@src/store'
import { moderateScale, scale } from 'react-native-size-matters'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Fontisto'
import { getFlagImage } from '@src/util/commonFunction'

const HeartLikeScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const likedProfiles = useSelector((state: RootState) => state.login_Reducer.likedProfileArr);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getLikedProfile())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching liked profiles:', error);
        setLoading(false);
      });
  }, []);

  // console.log('LikedProfiles--->>>', likedProfiles)
  const renderItem = ({ item }) => {
    const { COUNTRY, NAME, PROFILE_PIC, SEX, DOB, LOCATION } = item
    const { seconds, nanoseconds } = DOB;
    console.log(`seconds ${seconds} and nanoSeconds ${nanoseconds}`)
    return (
      <View style={styles.cardView}>
        <View style={styles.leftBox}>
          <FastImage
            style={styles.imgStyle}
            source={{ uri: PROFILE_PIC[0] }}
          />
        </View>
        <View style={styles.midBox}>
          <View style={styles.row}>
            {SEX === 'Male' ?
              <Icon name='male' size={14} color={Color?.male} />
              :
              <Icon name='female' size={14} color={Color.female} />
            }
            <Text style={styles.nameTxt}>{NAME}</Text>
          </View>
          <View>
            <View style={styles.row}>
              <FastImage
                style={styles.flagImg}
                source={{ uri: getFlagImage(COUNTRY) }}
              />
              <Text style={styles.countryTxt}>{COUNTRY}</Text>
            </View>

          </View>
        </View>
        <View style={styles.rightBox}>
          <TouchableOpacity style={styles.btn} onPress={() => null}>
            <Text style={styles.btnTxt}>Check Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <>
      <HeaderGoToBack
        title={Strings?.likeClick}
        onPress={() => navigation?.goBack()}
        bgColor={{ backgroundColor: 'white' ,height:moderateScale(75)}}
      />
      <View style={styles.main}>
        {
          loading ?
            <View style={styles.loaderView}>
              <ActivityIndicator size={'large'} color={Color?.Primary_Color} />
            </View>
            :
            <FlatList
              data={likedProfiles}
              renderItem={renderItem}
              keyExtractor={item => item?.USER_ID}
            />
        }
      </View>
    </>
  )
}

export default HeartLikeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: moderateScale(7),
    backgroundColor: 'white'
    // justifyContent:'center',
    // alignItems:'center'
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center'
  },
  cardView: {
    marginVertical: moderateScale(7),
    backgroundColor: 'white',
    shadowColor: "#B4B4B8",
    marginHorizontal: moderateScale(3),
    height: moderateScale(70),
    width: '96%',
    alignSelf: 'center',
    // width:'100%',
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    borderWidth: 1,
    borderColor: Color?.Primary_Color
  },
  nameTxt: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: Color?.Black_Color,
    marginLeft: moderateScale(2)
  },
  countryTxt: {
    marginLeft: moderateScale(2)
  },
  leftBox: {
    width: '30%',
    alignItems: 'center'
  },
  midBox: {
    width: '40%',
    // alignItems:'center'
  },
  rightBox: {
    width: '30%',
    // backgroundColor:'red',
    alignItems:'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(3)
  },
  flagImg: {
    height: moderateScale(12),
    width: moderateScale(12),
    borderRadius: moderateScale(6)
  },
  btn: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:Color?.violet,
    paddingHorizontal:moderateScale(9),
    paddingVertical:moderateScale(9),
    borderRadius:moderateScale(6),
    
  },
  btnTxt:{
    fontSize:scale(9),
    color:Color.White_Color
  }
})