import {HeaderGoToBack, Label} from '@src/commonComponent';
import {CommonStyles, Loader} from '@src/util';
import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {Strings} from '@src/util';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import * as Storage from '@src/service';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {getAllLike, updateCount} from '@src/redux/LoginAction';
import {styles, dynamicStyles} from './styles';
import {scale} from 'react-native-size-matters';
import PopUpModal from './Modal';
import {Ago, myAge} from '@src/util/Validator';
import onlineOfflineHooks from '@src/hooks/onlineOfflineHooks';

interface Props {
  showModal: boolean;
  uri: string;
  selected: number;
}

interface navigationProps {
  ShowOtherProfile: {
    ITEM: any;
  };
  ChatScreen: {
    INFO: any;
  };
}

const Notification: FC = () => {
  const navigation = useNavigation<NavigationProp<navigationProps>>();
  const dispatch = useDispatch<any>();
  const {hideProgressBar, likeList} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const [userList, setUserList] = onlineOfflineHooks();
  const [list, setList] = useState<any>([]);
  const [data, setData] = useState<Props>({
    showModal: false,
    uri: '',
    selected: 0,
  });
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    dispatch(updateCount(0));
  }, []);

  useEffect(() => {
    Storage.retrieveData('USER_ID').then(id => {
      let pars = {userId: id};
      dispatch(getAllLike(pars));
      setList([]);
    });
  }, []);

  useEffect(() => {
    setList(likeList);
  }, [likeList]);

  const _renderItem = ({item}: any) => {
    const {USER_ID, NAME, age, PROFILE_PIC, time, pic, DOB} = item;
    return (
      <TouchableOpacity
        style={dynamicStyles(USER_ID === data?.selected).main_box}
        onPress={() => {
          setSelectedItem(item);
          setData(preData => ({
            ...preData,
            selected: USER_ID,
            uri: PROFILE_PIC[0],
            showModal: true,
          }));
        }}>
        <FastImage
          style={styles.img}
          resizeMode="contain"
          source={{uri: PROFILE_PIC[0]}}
        />
        <View style={styles.detail_box}>
          <Label textStyle={styles.name_txt} title={`${NAME},${myAge(DOB)}`} />
          <Label
            textStyle={dynamicStyles(USER_ID === data?.selected).time_txt}
            title={Ago(time)?.toString() ?? ''}
          />
          <Label textStyle={styles.status_txt} title={Strings.likeProfile} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title={Strings?.notification}
        onPress={() => navigation?.goBack()}
      />
      <Loader Visible={hideProgressBar} />
      <PopUpModal
        Uri={data?.uri}
        Visible={data?.showModal}
        SelectedProfile={selectedItem}
        OnClickBack={() => setData(preData => ({...preData, showModal: false}))}
        OnClickNext={item => {
          setData(preData => ({...preData, showModal: false}));
          navigation.navigate('ShowOtherProfile', {ITEM: item});
        }}
        OnClickMessage={() => {
          setData(preData => ({...preData, showModal: false}));
          navigation.navigate('ChatScreen', {INFO: selectedItem});
        }}
        ActiveList={userList}
      />
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
        style={styles.list_Main}
        contentContainerStyle={styles.list_Content}
        getItemLayout={(data, index) => ({
          length: scale(90),
          offset: scale(90) * Math.floor(index),
          index,
        })}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty_Con}>
              <Label
                textStyle={styles.empaty_Label}
                title={hideProgressBar ? '' : 'Notification not available'}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Notification;
