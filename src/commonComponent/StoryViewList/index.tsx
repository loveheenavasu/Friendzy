import {View, Text, FlatList, StyleSheet, Modal} from 'react-native';
import React from 'react';
import {User} from '@src/util/types'; // Assuming User interface is defined here
import {Color} from '@src/util';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

interface StoryViewListProps {
  visible: boolean;
  viewedUsers: User[]; // List of users who viewed the story
  onClose: () => void;
}

const StoryViewList: React.FC<StoryViewListProps> = ({
  visible,
  viewedUsers,
  onClose,
}) => {
  if (!visible || viewedUsers.length === 0) {
    return null; // Don't render if not visible or no users viewed
  }

  const renderUser = ({item}: {item: User}) => (
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
      {/* <Modal
        animationType="slide"
        presentationStyle='overFullScreen'
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          onClose();
        }}
        > */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Viewed by:</Text>
            <FlatList
              data={viewedUsers}
              renderItem={renderUser}
              keyExtractor={item => item.USER_ID} // Assuming USER_ID is unique
              showsVerticalScrollIndicator={false} // Hide scroll indicator if needed
            />
          </View>
        </View>
      {/* </Modal> */}
    </View>
  );
};

export default StoryViewList;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: scale(18),
  },
  modalView: {
    flex: 1,
    marginTop: scale(18),
    backgroundColor: Color.White_Color,
    padding: scale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderTopRightRadius:scale(20),
    borderTopLeftRadius:scale(20),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
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
