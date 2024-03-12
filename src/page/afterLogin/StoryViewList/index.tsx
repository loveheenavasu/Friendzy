import React from 'react';
import { View, Text, FlatList, StyleSheet, Modal } from 'react-native';
import { User } from '@src/util/types'; // Assuming User interface is defined here
import { Color } from '@src/util';
import { scale } from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import BackIcon from '@src/commonComponent/BackIcon';
const StoryViewListScreen = ({ route, navigation }:any) => {
  const { visible, viewedUsers } = route.params;

  if (!visible || viewedUsers.length === 0) {
    return null; // Don't render if not visible or no users viewed
  }

  const renderUser = ({ item }:{item:User}) => (
    <View style={styles.userItem}>
      <FastImage
        source={{
          uri: item.PROFILE_PIC[0],
        }}
        style={styles.userImage}
      />
      <Text style={styles.userName}>{item.NAME}</Text>
      {/* You can add profile picture or other user details here */}
    </View>
  );

  return (
    <View style={styles.centeredView}>
      <BackIcon/>
          <View style={styles.modalView}>
            <Text style={styles.title}>Viewed by:</Text>
            <FlatList
              data={viewedUsers}
              renderItem={renderUser}
              keyExtractor={(item) => item.USER_ID} // Assuming USER_ID is unique
              showsVerticalScrollIndicator={false} // Hide scroll indicator if needed
            />
          </View>
    </View>
  );
};

export default StoryViewListScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor:Color.White_Color,
    padding: scale(15),
  },
  modalView: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color:Color.Black_Color
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    color: Color.Black_Color,
  },
  userImage: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(50),
    marginRight: scale(10),
  },
});
