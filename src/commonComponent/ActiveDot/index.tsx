import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import { scale } from 'react-native-size-matters'
import Color from '../../util/Color'

interface Props{
    dotStyle:ViewStyle;
}

const ActiveDot:FC<Props> = ({dotStyle}) => {
  return (
    <View style={{...styles.dot,...dotStyle}}></View>
  )
}

export default ActiveDot

const styles = StyleSheet.create({
    dot:{
        backgroundColor: Color?.Active_green,
        height: scale(8),
        width: scale(8),
        borderRadius: scale(4),
        position:'absolute',
        bottom:4,
        right:24,
   }
})