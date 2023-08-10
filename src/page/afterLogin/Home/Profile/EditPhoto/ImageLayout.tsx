import React, {FC} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {scale} from 'react-native-size-matters';
import {Color} from '@src/util';
const DummyData = Array.from({length: 6}, () => undefined);

interface ImageArray {
  pic: string;
  hasImage: boolean;
}

interface Props {
  ImageArary: ImageArray[];
  ClickAddImage: (index: number) => void | undefined;
}

const ImageLayout: FC<Props> = ({ImageArary, ClickAddImage}) => {
  return (
    <View style={styles.list_Main}>
      {DummyData.map((item, index) => {
        return (
          <View key={index} style={styles.list_F_Child}>
            {ImageArary[index]?.pic && (
              <FastImage
                source={{uri: ImageArary[index]?.pic}}
                resizeMode="cover"
                style={styles.pic}
              />
            )}
            <TouchableOpacity
              style={styles.rounded}
              onPress={() => ClickAddImage(index)}>
              <AntDesign
                name="plus"
                color={Color.White_Color}
                size={scale(23)}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ImageLayout;
