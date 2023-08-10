import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTrade from './HomeTrade';
import First from './Background/Fisrt';
import Three from './Background/Three';
import Second from './Background/Second';
import ChatList from '../ChatList';
import Profile from './Profile';
import {Color} from '@src/util';
import {useDispatch} from 'react-redux';
import {getAllChatList, getAllUser} from '@src/redux/LoginAction';

const Tab = createBottomTabNavigator();

const Home: FC = () => {
  const dispatch = useDispatch<any>();

  return (
    <View style={styles.main}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: 'red'},
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="HomeThree" // Make sure the route name is correct
      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => <First show={focused} />,
          }}
        />
        <Tab.Screen
          name="HomeThree"
          component={HomeTrade}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => <Second show={focused} />,
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              dispatch(getAllUser());
            },
          })}
        />
        <Tab.Screen
          name="ChatList"
          component={ChatList}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => <Three show={focused} />,
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              dispatch(getAllChatList());
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.White_Color,
  },
});

export default Home;
