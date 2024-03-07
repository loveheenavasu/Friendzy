import {RouteProp} from '@react-navigation/native';

export interface User {
  BIO: string;
  COUNTRY: string;
  DOB: {
    nanoseconds: number;
    seconds: number;
  };
  EMAIL: string;
  FILE: {
    filename: string;
    uploadUri: string;
  }[];
  LIKE: string[];
  LOCATION: string;
  NAME: string;
  PASS: string;
  PHONE: string;
  PROFILE_PIC: string[];
  SEARCH_CRITERIA: {
    mAge: {
      maxAge: number;
      minAge: number;
    };
    mGender: string;
    mLocation: string;
    selectedInterests: number[];
  };
  SEX: string;
  SUPERLIKE: boolean;
  TOKEN: string;
  USER_ID: string;
}
export type RootStackParamList = {
    Intro: undefined;
    Login: undefined;
    SignUp: undefined;
    Forget: undefined;
    Otp: undefined;
    NewPass: undefined;
    Congratulation: undefined;
    SelectCountry: undefined;
    Profile: undefined;
    SelectInterest: undefined;
    AddPhotos: undefined;
    Home: undefined;
    SearchCriteria: undefined;
    GoUpgradeVip: undefined;
    ChatScreen: {
        INFO: any;
      };
    EditProfile: undefined;
    EditPhoto: undefined;
    Notification: undefined;
    ShowOtherProfile: undefined;
    ChangePassword: undefined;
    HeartLikeScreen: undefined;
    CheckProfile: {
      otherUser:User
    };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
