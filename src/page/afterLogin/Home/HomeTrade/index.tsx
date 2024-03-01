import React, {FC, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {Loader} from '@src/util';
import styles from './styles';
import BottomLayout from './BottomLayout';
import CenterLayout from './CenterLayout';
import EmptyLayout from './EmptyLayout';
import {HomeHeader, Label} from '@src/commonComponent';
import SwiperLayout from './SwiperLayout';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUser, likeCount} from '@src/redux/LoginAction';
import {RootState} from '@src/store';
import * as Storage from '@src/service';
import loginUserHooks from '@src/hooks/loginUserHooks';
import firestore from '@react-native-firebase/firestore';
import {useRoute, RouteProp} from '@react-navigation/native';
import MatchModal from './Modal/MatchModal';

interface Props {
  showLike: boolean;
  showSupperLike: boolean;
  showNope: boolean;
  name: string | undefined;
}


interface HeartLikeProps {
  dob: { nanoseconds: number; seconds: number };
  id: string;
  location: string;
  loginUserId: string;
  name: string;
  token: string;
  uri: string;
}

var mTimeOut: any = null;

const HomeThree: FC = () => {
  const dispatch = useDispatch<any>();
  const {hideProgressBar, tradeList, showPerfectMatch,likedCount} = useSelector(
    (state: RootState) => state.login_Reducer,
  );
  const [loginId] = loginUserHooks();
  const [cards, setCardList] = useState([]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [active, setActive] = useState<boolean>(false);
  const [heartLiked,setHeartLiked] = useState<HeartLikeProps[]>([]);

  const mRoute = useRoute<RouteProp<routesProps, 'HomeThree'>>();

  const [data, setData] = useState<Props>({
    showLike: false,
    showSupperLike: false,
    showNope: false,
    name: '',
  });
  const swiperRef = useRef<any>(null);

  const refreshList = () => {
    dispatch(getAllUser());
    dispatch(likeCount())
  };

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    Storage.retrieveData('NAME').then(res => {
      setData(PreData => ({...PreData, name: res}));
    });
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('UsersVisibility')
      .onSnapshot(querydocument => {
        querydocument?.forEach(doc => {
          if (mRoute?.params?.INFO?.USER_ID == doc.id) {
            setActive(doc?.data().status);
          }
        });
      });
    return () => {
      subscribe;
    };
  }, []);

  useEffect(() => {
    const mTemp = [];
    for (const trade of tradeList) {
      const likeArray = trade?.LIKE || [];
      const imageList = trade?.PROFILE_PIC || [];
      if (Array.isArray(likeArray) && likeArray?.includes(loginId)) {
      } else if (trade?.USER_ID === loginId) {
      } else {
        const Actor = {
          id: trade?.USER_ID,
          uri: imageList[0],
          token: trade?.TOKEN,
          name: trade?.NAME,
          loginUserId: loginId,
          location: trade?.LOCATION,
          dob: trade?.DOB,
        };
        mTemp.push(Actor);
      }
    }
    setCardList(mTemp);
  }, [tradeList]);

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const clickLike = () => {
    clearTimeout(mTimeOut);
    setData(prevData => ({
      ...prevData,
      showLike: true,
      showSupperLike: false,
      showNope: false,
    }));
    mTimeOut = setTimeout(() => {
      setData(prevData => ({...prevData, showLike: false}));
      swiperRef?.current?.swipeRight(); // this is calling the swipeRight of Swiper
      clearTimeout(mTimeOut);
    }, 1200);
  //  dispatch(likeCount())
  };




  const clickSupperLike = () => {
   clearTimeout(mTimeOut);
    setData(prevData => ({
      ...prevData,
      showLike: false,
      showSupperLike: true,
      showNope: false,
    }));
    mTimeOut = setTimeout(() => {
      setData(prevData => ({...prevData, showSupperLike: false}));
      swiperRef?.current?.swipeRight();
      clearTimeout(mTimeOut);
    }, 1200);
  };

  const clickNope = () => {
    clearTimeout(mTimeOut);
    setData(prevData => ({
      ...prevData,
      showLike: false,
      showSupperLike: false,
      showNope: true,
    }));
    mTimeOut = setTimeout(() => {
      setData(prevData => ({...prevData, showNope: false}));
      swiperRef?.current?.swipeLeft();
      clearTimeout(mTimeOut);
    }, 1200);
  };
  return (
    <View style={styles.container}>
      <HomeHeader/>
      <Loader Visible={hideProgressBar} />
      {showPerfectMatch && (
        <MatchModal LoginUserId={loginId} LoginName={data?.name} />
      )}
      {swipedAllCards ? (
        <EmptyLayout
          onClickReset={() => {
            refreshList();
            setSwipedAllCards(false);
            setCardList([]);
          }}
        />
      ) : (
        <>
          {cards.length > 0 && (
            <SwiperLayout
              Ref={swiperRef}
              CardIndex={cardIndex}
              Cards={cards}
              OnSwipedAllCards={onSwipedAllCards}
              UserName={data?.name}
              Active={active}
            />
          )}
        </>
      )}
      <CenterLayout
        ShowLike={data?.showLike}
        ShowSupperLike={data?.showSupperLike}
        ShowNope={data?.showNope}
      />
      {!swipedAllCards && cards.length > 0 ? (
        <BottomLayout
          onClickNope={clickNope}
          onClickLike={clickLike}
          onClickSupper={clickSupperLike}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Label
            title={
              hideProgressBar
                ? ''
                : 'No data available, Please try again another times'
            }
          />
        </View>
      )}
    </View>
  );
};

export default HomeThree;
