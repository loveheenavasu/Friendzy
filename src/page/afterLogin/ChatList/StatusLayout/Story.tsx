import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import InstaStory, {IUserStory, IUserStoryItem} from 'react-native-insta-story';
import {Label} from '@src/commonComponent';
import {Color} from '@src/util';
import {scale} from 'react-native-size-matters';
import {fetchStoryViewedUsers, handleStoryViewed} from '@src/redux/StoryAction';
import Eye from 'react-native-vector-icons/AntDesign';
import {User} from '@src/util/types';
import StoryViewList from '@src/commonComponent/StoryViewList';
import { useNavigation } from '@react-navigation/native';
interface StoryProps {
  stories: IUserStory[];
  showViews: boolean;
}
const Story: FC<StoryProps> = ({stories, showViews}) => {
  const [showStoryViewModal, setShowStoryViewModal] = useState<boolean>(false);
  const [viewedPersonList, setViewedPersonList] = useState<User[]>([]);
  function getTimeAgo(timestamp: Date) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() / 1000 - timestamp.seconds;
    const minutes = Math.floor(timeDifference / 60);
    const hours = Math.floor(minutes / 60);

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours >= 1) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    }
  }

  // const navigation = useNavigation()
  // const handleStoryViewedPressed = async (item: String[]) => {
  //   // setShowStoryViewModal(true);
    
  //   try {
  //     const response = await fetchStoryViewedUsers(item);
  //     setViewedPersonList(response);
  //     // navigation.navigate('StoryViewList', { visible: true, viewedUsers: response });

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleClose = () =>{
    setViewedPersonList([])
    setShowStoryViewModal(false)
  }
  return (
    <>
      <InstaStory
        pressedAvatarTextColor={'black'}
        unPressedAvatarTextColor={'black'}
        unPressedBorderColor={'grey'}
        pressedBorderColor={'grey'}
        data={stories}
        onStorySeen={userStory => {
          handleStoryViewed(userStory);
        }}
        renderTextComponent={({item, profileName}) => {
          return (
            <View>
              {/* <Text st>{profileName}</Text> */}
              <View style={styles.flex}>
                <Label textStyle={styles.profileName} title={profileName} />
                {/* {showViews && item?.viewedBy?.length && (
                  <Pressable
                    onPress={() => handleStoryViewedPressed(item?.viewedBy)}
                    style={[styles.flex, styles.blurBackground]}>
                    <Eye
                      name="eye"
                      color={Color.White_Color}
                      size={scale(14)}
                    />
                      <Label
                        textStyle={styles.views}
                        title={item?.viewedBy?.length}
                      />
                  </Pressable>
                )} */}
              </View>
              <Label
                textStyle={styles.timestamp}
                title={getTimeAgo(item.timestamp)}
              />
            </View>
          );
        }}
        duration={5}
      >

      </InstaStory>
      {showStoryViewModal && 
      <StoryViewList
        viewedUsers={viewedPersonList}
        visible={showStoryViewModal}
        onClose={handleClose}
      />
      }
      </>
  );
};

export default Story;

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blurBackground: {
    backgroundColor: 'rgba(56, 56, 56, 0.5)',
    justifyContent: 'center',
    borderRadius: scale(4),
    paddingHorizontal: scale(5),
  },
  views: {
    color: Color.White_Color,
    marginLeft: scale(5),
  },
  profileName: {
    color: Color.White_Color,
    marginHorizontal: scale(10),
  },
  timestamp: {
    color: Color.White_Color,
    fontSize: scale(10),
    marginLeft: scale(10),
  },
});
