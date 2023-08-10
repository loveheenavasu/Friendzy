import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CommonStyles, InterestArray, Strings, Icon, Loader} from '@src/util';
import {Label, HeaderGoToBack, CustomButton} from '@src/commonComponent';
import {dynamicStyles, styles} from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {updateProfilePic} from '@src/redux/LoginAction';

type stackParamsList = {
  SelectInterest: {
    NAME: string;
    PHONE: string;
    DOB: string | number;
    SEX: string;
    LOCATION: string;
    BIO: string | number;
    EMAIL: string;
    PASS: string | number;
    COUNTRY: string;
    FILE: string | Object[];
  };
};

const SelectInterest: FC = () => {
  const dispatch = useDispatch<any>();
  const {hideProgressBar} = useSelector(
    (state: RootState) => state.login_Reducer,
  );

  const mRoute = useRoute<RouteProp<stackParamsList, 'SelectInterest'>>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedArr, setSelected] = useState<Number[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(hideProgressBar);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();

  const selectUnselect = (selectId: Number) => {
    let itemIndex = selectedArr.findIndex(itemId => itemId === selectId);
    if (itemIndex < 0) {
      setSelected([...selectedArr, selectId]);
    } else {
      let copyArr = [...selectedArr];
      copyArr?.splice(itemIndex, 1);
      setSelected(copyArr);
    }
  };
  const showModal = async () => {
    const {EMAIL, PASS, FILE} = mRoute.params;

    setShowLoader(true);
    setModalVisible(true);

    const createUser = await auth().createUserWithEmailAndPassword(
      EMAIL,
      PASS.toString(),
    );
    const token = await messaging().getToken();
    const storeUser = await firestore()
      .collection('Users')
      .doc(createUser?.user?.uid)
      .set({
        ...mRoute.params,
        SELECTED_INTEREST: selectedArr,
        TOKEN: token,
        USER_ID: createUser?.user?.uid,
      });

    for (let index = 0; index < FILE.length; index++) {
      let pars = {
        uploadUri: FILE[index]?.uploadUri,
        userId: createUser?.user?.uid,
        filename: FILE[index].filename,
      };

      dispatch(updateProfilePic(pars));
    }
    setModalVisible(false);
  };

  return (
    <View style={CommonStyles.main}>
      <HeaderGoToBack
        title={Strings?.selectYourInterest}
        onPress={() => navigation.goBack()}
      />
      <Label title={Strings?.selectText} textStyle={styles.txt} />
      <Loader Visible={showLoader} />
      <ScrollView>
        <View style={styles.itemWrap}>
          {InterestArray?.map((item, index) => {
            let active = selectedArr?.includes(item?.id);
            return (
              <TouchableOpacity
                key={index}
                style={dynamicStyles(active).roundView}
                onPress={() => selectUnselect(item?.id)}>
                <Label
                  title={item?.name}
                  textStyle={dynamicStyles(active).txt_style}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <CustomButton
        name={Strings?.save}
        btnStyle={CommonStyles?.btnStyle}
        txtStyle={CommonStyles?.txtStyle}
        onPress={() => showModal()}
      />
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.35}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modal_outerview}>
          <View style={styles.modal_innerView}>
            <FastImage
              source={Icon?.SuccessAccount}
              resizeMode="contain"
              style={styles?.img}
            />
            <Label title={Strings?.great} textStyle={styles.big_txt} />
            <Label
              title={Strings?.accountSuccess}
              textStyle={styles.small_txt}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectInterest;
