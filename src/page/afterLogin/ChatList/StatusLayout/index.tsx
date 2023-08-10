import React, {FC, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomImage from '../../../../commonComponent/CustomImage/Image';
import Label from '../../../../commonComponent/Label';
import Color from '../../../../util/Color';
import Svg, {Circle, Path, Rect} from 'react-native-svg';

import firestore from '@react-native-firebase/firestore';

interface Porps {
  statusData: object[];
}

const StatusLayout: FC<Porps> = ({statusData}) => {
  const numberOfDots = (2 * 3.14 * 48) / 2; //10 number of statues //48 is the radius of the circle

  // useEffect(() => {
  //   const subScribe = firestore()
  //     .collection('Chats')
  //     .onSnapshot(documentSnapshot => {
  //       console.log('User data: ', documentSnapshot.data());
  //     });

  //   return () => subScribe();
  // }, []);

  const _StatusList = ({item}: any) => {
    const {id, img, name} = item;
    return (
      <TouchableOpacity style={styles.status_view}>
        {/* <View
          style={{
            // width: scale(60),
            // height: scale(60),
            // borderRadius: scale(30),
            // // borderStyle: 'dashed',
            // // borderTopColor: 'red',
            // // borderBottomColor:"blue",
            // borderLeftColor: 'green',
            // borderRightColor: 'blue',
            // borderWidth: 20,
            // justifyContent: 'center',
            // alignItems: 'center',
            // borderStyle:"solid"

            borderWidth: 20,
            borderTopColor: 'blue',
            // borderRightColor: 'yellow',
            // borderBottomColor: 'green',
            borderLeftColor: 'blue',
            borderColor:"red",
            width: 60,
            height: 60,
            borderRadius:30,
            justifyContent:"center",
            alignItems:"center",
            overflow: 'hidden',
            borderStyle:"solid",
            transform: [{ rotate: '-45deg' }],
          }}>
          <CustomImage
            styles={{
              width: scale(50),
              height: scale(50),
              borderRadius: scale(25),
              transform: [{ rotate: '45deg' }],
            }}
            uri={img}
          />
        </View> */}

        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'red',
            marginRight: -2,
          }}
        />
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'grey',
            position: 'absolute',
            left: -2,
            top: 0,
          }}></View>
        <CustomImage
          styles={{
            width: scale(50),
            height: scale(50),
            borderRadius: scale(25),
            position: 'absolute',
            top: 2,
          }}
          uri={img}
        />
        <Label title={name} textStyle={styles.name_txt} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={statusData}
      renderItem={_StatusList}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{marginLeft: scale(5.2)}}
    />
  );
};

const styles = StyleSheet.create({
  status_view: {
    marginLeft: scale(4.5),
    marginRight: scale(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  name_txt: {
    color: Color?.Primary_Color,
    fontWeight: '400',
    fontSize: scale(11),
    marginTop: verticalScale(3),
  },
  outerCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  leftWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 21,
    height: 42,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 21,
    height: 42,
    borderRadius: 21,
  },
});

export default StatusLayout;
