import React, {FC, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './beforeLogin/Intro';
import Login from './beforeLogin/Login';
import SignUp from './beforeLogin/SignUp';
import {View} from 'react-native';
import ForgotPassword from './beforeLogin/ForgotPassword';
import OTP from './beforeLogin/ForgotPassword/OTP';
import NewPassword from './beforeLogin/ForgotPassword/NewPassword';
import Congratulation from './beforeLogin/passwordCongratulation';
import SelectCountry from './beforeLogin/SignUp/SelectCountry';
import Profile from './beforeLogin/SignUp/Profile';
import SelectInterest from './beforeLogin/SignUp/SelectInterest';
import AddPhotos from './beforeLogin/SignUp/AddPhotos';
import EditProfile from './afterLogin/Home/Profile/EditProfile';
import Home from './afterLogin/Home';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import * as Storage from '../service';
import SearchCriteria from './afterLogin/Home/Profile/SearchCriteria';
import GoUpgradeVip from './afterLogin/GoUpgradeVip';
import ChatScreen from './afterLogin/ChatScreen';
import auth from '@react-native-firebase/auth';
import {Loader} from '@src/util';
import EditPhoto from './afterLogin/Home/Profile/EditPhoto';
import Notification from './afterLogin/Notification';
import notificationPermission from '@src/hooks/notificationPersmission';
import ShowOtherProfile from './afterLogin/Notification/ShowOtherProfile';
import ChangePassowrd from './afterLogin/Home/Profile/ChangePassword';

const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

// Stack for screens before Login
const BeforeLoginStack = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <LoginStack.Screen name="Intro" component={Intro} />
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="SignUp" component={SignUp} />
      <LoginStack.Screen name="Forget" component={ForgotPassword} />
      <LoginStack.Screen name="Otp" component={OTP} />
      <LoginStack.Screen name="NewPass" component={NewPassword} />
      <LoginStack.Screen name="Congratulation" component={Congratulation} />
      <LoginStack.Screen name="SelectCountry" component={SelectCountry} />
      <LoginStack.Screen name="Profile" component={Profile} />
      <LoginStack.Screen name="SelectInterest" component={SelectInterest} />
      <LoginStack.Screen name="AddPhotos" component={AddPhotos} />
    </LoginStack.Navigator>
  );
};

//  Stack of Screens After Login
const AfterLoginStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="SearchCriteria" component={SearchCriteria} />
      <HomeStack.Screen name="GoUpgradeVip" component={GoUpgradeVip} />
      <HomeStack.Screen name="ChatScreen" component={ChatScreen} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="EditPhoto" component={EditPhoto} />
      <HomeStack.Screen name="Notification" component={Notification} />
      <HomeStack.Screen name="ShowOtherProfile" component={ShowOtherProfile} />
      <HomeStack.Screen name="ChangePassword" component={ChangePassowrd} />
    </HomeStack.Navigator>
  );
};

const Navigator: FC = () => {
  const userDate = useSelector((state: RootState) => state.login_Reducer);
  const [email, setEmail] = useState<string>();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [token, setToken] = notificationPermission();

  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    if (user) {
      Storage.storeData('USER_ID', user?.uid);
      setShowLoader(false);
      setEmail(user?.email);
    } else {
      setShowLoader(false);
      setEmail('');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{flex: 1}}>
      {showLoader ? (
        <Loader Visible={showLoader} />
      ) : (
        <NavigationContainer>
          {!email ? <BeforeLoginStack /> : <AfterLoginStack />}
        </NavigationContainer>
      )}
    </View>
  );
};

export default Navigator;
