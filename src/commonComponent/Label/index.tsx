import React, {FC} from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Color from '../../util/Color';

interface Props {
  title: string | number;
  textStyle?: TextStyle;
  numberofLine?: number;
  showStar?: boolean;
  starStyle ?: TextStyle
}

const Label: FC<Props> = ({title, textStyle, numberofLine, showStar, starStyle}) => {
  return (
    <>
      {showStar ? (
        <View style={{flexDirection: 'row'}}>
          <Text  numberOfLines={numberofLine} style={[styles.main, textStyle]}>
            {title}
          </Text>
          <Text style={[styles.star_Label, starStyle]}>*</Text>
        </View>
      ) : (
        <Text numberOfLines={numberofLine} style={[styles.main, textStyle]}>
          {title}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: scale(14),
    color: Color.Black_Color,
  },
  star_Label: {
    fontSize: scale(14),
    color: Color.Red_Color,
  },
});

export default Label;
