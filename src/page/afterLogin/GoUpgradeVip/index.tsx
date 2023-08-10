import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../../../util/CommonStyles'
import Icon from '../../../util/Icon'
import { Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import Swiper from 'react-native-swiper'
import Color from '../../../util/Color'
import Label from '../../../commonComponent/Label'
import CustomButton from '../../../commonComponent/CustomButton'
import strings from '../../../util/Localization/string'
import { HeaderGoToBack } from '@src/commonComponent'
import {useNavigation} from '@react-navigation/native';


const displayData = [
  {
    heading: 'Buy more Top picks',
    body: 'Get full access to top picks,likes you,Send Unlimited Likes& more '
  },
  {
    heading: 'Buy more Top picks',
    body: 'Get full access to top picks,likes you,Send Unlimited Likes& more '
  },
  {
    heading: 'Buy more Top picks',
    body: 'Get full access to top picks,likes you,Send Unlimited Likes& more '
  },
  {
    heading: 'Buy more Top picks',
    body: 'Get full access to top picks,likes you,Send Unlimited Likes& more '
  },
  {
    heading: 'Buy more Top picks',
    body: 'Get full access to top picks,likes you,Send Unlimited Likes& more '
  },
];

const planData = [
  { id: 1, plan: '12', price: '$80.00' },
  { id: 2, plan: '6', price: '$45.00' },
  { id: 3, plan: '1', price: '$10.00' },
]

const GoUpgradeVip = () => {

  const navigation = useNavigation();

  // Swiper component for displaying Text
  const TextSlide = () => {
    return (
      <View style={styles.swiper_box}>
        <Swiper style={styles.wrapper}
        >
          {
            displayData?.map(displayItem => {
              return (
                <View style={styles.slide_view}>
                  <Label title={displayItem?.heading} textStyle={styles.heading} />
                  <Label title={displayItem?.body} textStyle={styles.text} />
                </View>
              )
            })
          }
        </Swiper>
      </View>
    )
  }

  // Plan Componenent 
  const Plans = () => {
    const [select, setSelect] = useState<Number>()

    return (
      <View style={styles.plan_view}>
        {
          planData?.map(planItem => {
            let active = planItem?.id == select
            return (
              <>
                <TouchableOpacity
                  style={[styles.plan_box, active && { borderWidth: 2, borderColor: Color?.Primary_Color, backgroundColor: Color?.Light_white }]}

                  onPress={() => setSelect(planItem?.id)}>
                  <Label title={planItem?.plan} textStyle={{ ...styles.plan_txt, color: active ? Color?.Primary_Color : Color?.Black_Color }} />
                  <Label title='Months' textStyle={{ ...styles.month_txt, color: active ? Color?.Primary_Color : Color?.Black_Color }} />
                  <Label title={planItem?.price} textStyle={{ ...styles.price_txt, color: active ? Color?.Primary_Color : Color?.Black_Color }} />
                  {
                    (planItem?.id == 2 && select == 2) &&
                    <Label title={strings?.save} textStyle={styles.save_txt} />
                  }
                </TouchableOpacity>
                {
                  (planItem?.id == 2 && select == 2) &&
                  <View style={styles.most_popular_view}>
                    <Label title={strings.popular} textStyle={styles.popular_txt} />
                  </View>
                }
              </>
            )
          })
        }


      </View>
    )
  }

  return (
    <>
       <HeaderGoToBack
        title="Upgrade Plans"
        onPress={() => navigation.goBack()}
        bgColor={{backgroundColor:Color.White_Color}}
      />
    <View style={CommonStyles.main}>
    <ImageBackground source={Icon?.HeartBackground} style={CommonStyles?.splash3_Con}>
        <Image source={Icon?.AppLogo2} style={styles.logo} resizeMode='contain' />
        <TextSlide />
        <Plans />
        <CustomButton
          name={strings.upgrade}
          btnStyle={{ ...CommonStyles.btnStyle, position: 'absolute', bottom: 3 }}
          txtStyle={CommonStyles.txtStyle}
          onPress={() => null}
        />
      </ImageBackground>
    </View>
    </>
    
  )
}

export default GoUpgradeVip

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: '60%'
  },
  wrapper: {
  },
  slide_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color?.Primary_Color,
    fontSize: scale(13),
    fontWeight: '400',
    marginTop: verticalScale(10)
  },
  heading: {
    fontSize: scale(23),
    fontWeight: '400',
    color: Color?.Black_Color
  },
  swiper_box: {
    height: verticalScale(160)
  },
  plan_view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  plan_box: {
    alignItems: 'center',
    paddingHorizontal: scale(26),
    backgroundColor: Color?.LIGHT_GREY,
    paddingVertical: verticalScale(20),
    borderRadius: scale(7)
  },
  plan_txt: {
    fontWeight: '700',
    fontSize: scale(30),
    color: Color?.Black_Color
  },
  month_txt: {
    fontWeight: '700',
    fontSize: scale(15),
    color: Color?.Black_Color
  },
  price_txt: {
    fontWeight: '700',
    fontSize: scale(12),
    color: Color?.Black_Color,
    marginTop: verticalScale(5)
  },
  most_popular_view: {
    backgroundColor: Color?.Primary_Color,
    paddingHorizontal: scale(2),
    paddingVertical: verticalScale(1),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '20%',
    borderRadius: scale(10),
    top: -7,
    left: '40%'
  },
  popular_txt: {
    fontWeight: '700',
    fontSize: scale(10),
    color: Color?.White_Color
  },
  save_txt: {
    fontWeight: '700',
    fontSize: scale(10),
    color: Color?.Primary_Color,
    marginTop: verticalScale(5),
    letterSpacing: scale(2)
  }
})