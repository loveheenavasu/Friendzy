import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Color} from '@src/util';

interface props {
  Visible: boolean;
}

const Loader: FC<props> = ({Visible}) => {
  return (
    <>
      {Visible && (
        <View style={styles.main}>
          <ActivityIndicator size={'large'} color={Color.Primary_Color} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
