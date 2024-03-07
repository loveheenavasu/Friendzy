import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {Color} from '@src/util';
import Entypo from 'react-native-vector-icons/Entypo';

const BackIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.back_Con}
      onPress={() => navigation.goBack()}>
      <Entypo
        name="chevron-left"
        color={Color.Primary_Color}
        size={scale(25)}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;

const styles = StyleSheet.create({
  back_Con: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(6),
    backgroundColor: Color.White_Color,
    marginVertical: scale(7),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
