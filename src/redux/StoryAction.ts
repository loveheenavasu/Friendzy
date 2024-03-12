import firestore from '@react-native-firebase/firestore';
import * as Storage from '@src/service';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUserStory} from 'react-native-insta-story';

export const storyUpload = async (pars: {
  imageurl: string;
  caption: string;
}) => {
  const imageurl = pars.imageurl;
  const caption = pars.caption ? pars.caption : '';
  if (imageurl) {
    const userId = await Storage.retrieveData('USER_ID');
    try {
      const imageName = `stories/${Date.now()}.jpg`;
      const storageRef = storage().ref().child(imageName);

      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response as Blob);
        xhr.onerror = () => reject(new TypeError('Network request failed'));
        xhr.responseType = 'blob';
        xhr.open('GET', imageurl, true);
        xhr.send(null);
      });

      await storageRef.put(blob);
      // Get the download URL
      const downloadUrl = await storageRef.getDownloadURL();

      await firestore()
        .collection('Users')
        .doc(userId)
        .update({
          stories: firestore.FieldValue.arrayUnion({
            story_id: Date.now(),
            story_image: downloadUrl,
            swipeText: caption,
            // onPress: '()=>console.log("pressed")',
            timestamp: firebase.firestore.Timestamp.now(),
          }),
        });
      return true;
      // Close the modal after successful upload
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }
};

// export const fetchOwnStories = async () => {
//   const userId = await Storage.retrieveData('USER_ID');
//   try {
//     const userDoc = await firestore().collection('Users').doc(userId).get();

//     if (userDoc.exists) {
//       const userData = userDoc.data();
//       // console.log(userData);

//       if (userData) {
//         const stories = userData.stories || []; // In case stories field is not present or null
//         console.log(stories);
        
//         if (stories.length > 0) {
//           const modifiedStoryData = [
//             {
//               user_id: JSON.parse(JSON.stringify(userId)),
//               user_image: userData.PROFILE_PIC[0],
//               user_name: userData.NAME,
//               stories: userData.stories,
//             },
//           ];
//           return modifiedStoryData;
//         }
//       }
//     } else {
//       console.log('User document not found');
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching user stories:', error);
//     return [];
//   }
// };

export const fetchOwnStories = async () => {
  const userId = await Storage.retrieveData('USER_ID');
  try {
    const userDoc = await firestore().collection('Users').doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();

      if (userData) {
        const stories = userData.stories || [];

        const currentTime = new Date().getTime();
        const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000); // 24 hours ago in milliseconds

        // Filter out stories older than 24 hours
        const filteredStories = stories.filter(story => {
          const storyTimestamp = story.timestamp.seconds * 1000 + story.timestamp.nanoseconds / 1000000; // Convert Firestore timestamp to milliseconds
          return storyTimestamp >= twentyFourHoursAgo;
        });

        if (filteredStories.length > 0) {
          const modifiedStoryData = [{
            user_id: userId,
            user_image: userData.PROFILE_PIC[0],
            user_name: userData.NAME,
            stories: filteredStories,
          }];

          return modifiedStoryData;
        }
      }
    } else {
      console.log('User document not found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching user stories:', error);
    return [];
  }
};


// export const fetchOtherStories = async () => {
//   try {
//     const loginUserId = await Storage.retrieveData('USER_ID');

//     const loggedInUserData = await firestore()
//       .collection('Users')
//       .doc(loginUserId)
//       .get();

//     if (!loggedInUserData.exists) {
//       console.log('Logged-in user document not found');
//       return [];
//     }

//     const loggedInUser = loggedInUserData.data();

//     const userRef = await firestore().collection('Users').get();
//     const otherUsers = userRef.docs.map(documentSnapshot =>
//       documentSnapshot.data(),
//     );

//     const perfectMatchUserIds = (loggedInUser && loggedInUser.LIKE) || [];

//     const otherStories = otherUsers.reduce((acc: IUserStory[], user) => {
//       if (
//         perfectMatchUserIds.includes(user.USER_ID) &&
//         user.LIKE.includes(loginUserId)
//       ) {
//         console.log(user.USER_ID);
        
//         // Only include stories of perfect match users
//         if (user.stories) {
//           acc.push({
//             user_id: JSON.parse(JSON.stringify(user.USER_ID)),
//             user_image: user.PROFILE_PIC[0],
//             user_name: user.NAME,
//             stories: user.stories || [],
//           });
//         }
//       }
//       return acc;
//     }, []);

//     // console.log('Other stories:', otherStories);

//     return otherStories;
//   } catch (error) {
//     console.error('Error fetching other user stories:', error);
//     return [];
//   }
// };

export const fetchOtherStories = async () => {
  try {
    const loginUserId = await Storage.retrieveData('USER_ID');

    const loggedInUserData = await firestore()
      .collection('Users')
      .doc(loginUserId)
      .get();

    if (!loggedInUserData.exists) {
      console.log('Logged-in user document not found');
      return [];
    }

    const loggedInUser = loggedInUserData.data();

    const userRef = await firestore().collection('Users').get();
    const otherUsers = userRef.docs.map(documentSnapshot =>
      documentSnapshot.data(),
    );

    const perfectMatchUserIds = (loggedInUser && loggedInUser.LIKE) || [];

    const currentTime = new Date().getTime();
    const twentyFourHoursAgo = currentTime - (24 * 60 * 60 * 1000); // 24 hours ago in milliseconds

    const otherStories = otherUsers.reduce((acc: IUserStory[], user) => {
      if (
        perfectMatchUserIds.includes(user.USER_ID) &&
        user.LIKE.includes(loginUserId)
      ) {
        console.log(user.USER_ID);
        
        // Filter out stories older than 24 hours
        const filteredStories = (user.stories || []).filter(story => {
          const storyTimestamp = story.timestamp.seconds * 1000 + story.timestamp.nanoseconds / 1000000; // Convert Firestore timestamp to milliseconds
          return storyTimestamp >= twentyFourHoursAgo;
        });

        // Only include stories of perfect match users with valid timestamps
        if (filteredStories.length > 0) {
          acc.push({
            user_id: user.USER_ID,
            user_image: user.PROFILE_PIC[0],
            user_name: user.NAME,
            stories: filteredStories,
          });
        }
      }
      return acc;
    }, []);

    // console.log('Other stories:', otherStories);

    return otherStories;
  } catch (error) {
    console.error('Error fetching other user stories:', error);
    return [];
  }
};


export const handleStoryViewed = async (storie) => {
  const userId = await Storage.retrieveData('USER_ID');

  try {
    const userRef = firestore().collection('Users').doc(storie.user_id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log('User document not found');
      return;
    }

    const userData = userDoc.data();
    const userStories = userData && userData.stories || [];

    // Find the index of the story in the user's stories array
    const storyIndex = userStories.findIndex(story => story.story_id === storie.story.story_id);

    if (storyIndex !== -1) {
      // Check if the user ID is already present in the viewedBy array
      const viewedByArray = userStories[storyIndex].viewedBy || [];
      if (!viewedByArray.includes(userId)) {
        // Update the story with the user ID
        userStories[storyIndex] = {
          ...userStories[storyIndex],
          viewedBy: [...viewedByArray, userId]
        };
        // Update the user document in Firestore with the updated stories array
        await userRef.update({
          stories: userStories
        });
      }
    } else {
      console.log('Story not found in user stories array');
    }
  } catch (error) {
    console.log('Error updating story:', error);
  }
};


export const fetchStoryViewedUsers = async (item: String[]) => {
  try {
    const querySnapshot = await firestore().collection('Users').get();
    const allUsers = querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
    const filteredUsers = allUsers.filter(user => item.includes(user.USER_ID));
    return filteredUsers
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
