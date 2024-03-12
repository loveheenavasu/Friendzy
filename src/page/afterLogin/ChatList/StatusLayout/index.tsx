import React, {FC, useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from '@src/commonComponent/ImagePicker';
import {User} from '@src/util/types';
import * as Storage from '@src/service';
import {Label} from '@src/commonComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import {Color, Loader} from '@src/util';
import FastImage from 'react-native-fast-image';
import Plus from 'react-native-vector-icons/AntDesign';
import AddStatusModal from '@src/commonComponent/AddStatusModal';
import {fetchOtherStories, fetchOwnStories} from '@src/redux/StoryAction';
import Story from './Story';
import {IUserStory, IUserStoryItem} from 'react-native-insta-story';

const StatusLayout: FC = () => {
  const [userData, setUserData] = useState<User>();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedImageType, setSelectedImageType] = useState<string>('');
  const [isImagePickerVisible, setIsImagePickerVisible] =
    useState<boolean>(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] =
    useState<boolean>(false);
  const [stories, setStories] = useState<IUserStory[]>([]);
  const [otherUserStories, setOtherUserStories] = useState<IUserStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await Storage.retrieveData('USER_ID');

        const userDoc = await firestore().collection('Users').doc(userId).get();
        if (userDoc.exists) {
          const user = userDoc.data() as User; // Cast to User interface
          setUserData(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSelectMedia = (selectedImageUris: string) => {
    setSelectedImage(selectedImageUris);
    handleCloseImagePicker();
  };

  const handleCloseImagePicker = () => {
    setIsImagePickerVisible(false);
    setTimeout(() => {
      setIsAddStatusModalVisible(true);
    }, 1000);
  };

  const handleSelectMediaType = (value: string) => {
    setSelectedImageType(value);
  };

  const fetchLoggedUserStories = async () => {
    try {
      setLoading(true);
      const response = await fetchOwnStories();
      if (response) {
        const newStories = response.map(ele => ({
          ...ele,
          stories: ele.stories.map((stor: IUserStory) => ({
            ...stor,
            onPress: () => {},
          })),
        }));

        setStories(newStories);
      }
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchOtherUserStories = async () => {
    try {
      setLoading2(true);
      const response = await fetchOtherStories();
      if (response) {
        const newStories = response.map(ele => ({
          ...ele,
          stories: ele.stories.map((stor:IUserStoryItem) => ({...stor, onPress: () => null})),
        }));
        setOtherUserStories(newStories);
      }
      setTimeout(() => {
        setLoading2(false);
      }, 200);
    } catch (error) {
      console.log(error);
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchLoggedUserStories();
    fetchOtherUserStories();
  }, []);

  interface UserStatusProps {
    item: User;
    data: IUserStory[]; // Define the type of the data prop here
  }
  const UserStatus: FC<UserStatusProps> = ({item, data}) => {
    const {
      BIO,
      COUNTRY,
      DOB,
      EMAIL,
      FILE,
      LIKE,
      LOCATION,
      NAME,
      PASS,
      PHONE,
      PROFILE_PIC,
      SEARCH_CRITERIA,
      SEX,
      SUPERLIKE,
      TOKEN,
      USER_ID,
    } = item;
    const userImage = PROFILE_PIC[0];
    // console.log('data', data);

    if (data.length > 0) {
      return (
        <View style={styles.extraMargin}>
          <Story stories={stories} showViews={true} />
          <View style={styles.plusViewWithData}>
            <Plus
              name="plus"
              size={scale(16)}
              color={Color.White_Color}
              style={styles.plusIcon}
              onPress={() => setIsImagePickerVisible(!isImagePickerVisible)}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.status_view}>
        <Pressable
          onPress={() => setIsImagePickerVisible(!isImagePickerVisible)}>
          <FastImage style={styles.image} source={{uri: userImage}} />
        </Pressable>
        <Label title={NAME} textStyle={styles.name_txt} />
        <View style={styles.plusView}>
          <Plus
            name="plus"
            size={scale(16)}
            color={Color.White_Color}
            style={styles.plusIcon}
            onPress={() => setIsImagePickerVisible(!isImagePickerVisible)}
          />
        </View>
      </View>
    );
  };
  const cancelImageUpload = () => {
    setSelectedImage(''), setSelectedImageType('');
    fetchLoggedUserStories();
  };
  if (loading || loading2) {
    return <Loader Visible={loading2 || loading} />;
  }

  return (
    <>
      {userData && stories && (
        <View style={styles.flexRow}>
          <UserStatus item={userData} data={stories} />
          {otherUserStories && <Story showViews={false} stories={otherUserStories} />}
        </View>
      )}
      <ImagePicker
        visible={isImagePickerVisible}
        onClose={handleCloseImagePicker}
        onSelectMedia={handleSelectMedia}
        selectedData={selectedImage}
        selectOne
        type={'photo'}
        onSelectMediaType={handleSelectMediaType}
      />
      {selectedImage.length > 0 && (
        <AddStatusModal
          visible={isAddStatusModalVisible}
          imageurl={selectedImage}
          onClose={cancelImageUpload}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  status_view: {
    // marginHorizontal: scale(10),
    alignItems: 'center',
    // height: verticalScale(40),
    justifyContent: 'center',
  },
  image: {
    height: scale(60),
    width: scale(60),
    backgroundColor: 'red',
    borderRadius: scale(50),
    borderColor: Color.Red_Color,
    borderWidth: scale(1),
  },
  name_txt: {
    color: Color?.Black_Color,
    fontWeight: '400',
    fontSize: scale(10),
    marginTop: verticalScale(3),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusViewWithData: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(15),
    backgroundColor: Color.Black_Color,
    borderRadius: scale(10),
    padding: scale(2),
  },
  plusView: {
    position: 'absolute',
    bottom: scale(20),
    right: scale(0),
    backgroundColor: Color.Black_Color,
    borderRadius: scale(10),
    padding: scale(2),
  },
  plusIcon: {
    zIndex:100
  },
  extraMargin: {marginRight: scale(-20)},
});

export default StatusLayout;
