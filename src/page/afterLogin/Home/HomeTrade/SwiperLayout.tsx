import React, {FC} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import styles from './styles';
import {Strings, Color} from '@src/util';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {checkPerfectMatch, likeCount, sendNotification} from '@src/redux/LoginAction';
import NameLayout from './NameLayout';
import CustomImage from '@src/commonComponent/CustomImage/Image';
interface Props {
  Ref: any;
  OnSwipedAllCards: () => void;
  CardIndex: number;
  Cards: any;
  UserName: string | undefined;
  Active: boolean;
  // AddHeartArr?:(item:object)=>void | undefined;
}

const SwiperLayout: FC<Props> = ({
  Ref,
  OnSwipedAllCards,
  CardIndex,
  Cards,
  UserName,
  Active,
  // AddHeartArr
}) => {
  const dispatch = useDispatch<any>();
  const {} = useSelector((state: RootState) => state.login_Reducer);
  const clickLike = (ITEM: any,SUPERLIKE:boolean) => {
    console.log(ITEM);
    let pars = {
      token: ITEM?.token,
      name: ITEM?.name,
      userId: ITEM?.id,
      userName: UserName,
      loginUserId: ITEM?.loginUserId,
      SUPERLIKE:SUPERLIKE
    };
    dispatch(sendNotification(pars));
    dispatch(
      checkPerfectMatch({loginUserId: ITEM?.loginUserId, userId: ITEM?.id}),
    );
    // dispatch(likeCount())
  };

  const renderCard = (
    card: {id: number; uri: number; name: string; location: string},
    index: number,
  ) => {
    return (
      <View style={styles.card}>
        <CustomImage
          uri={{uri: card?.uri}}
          styles={styles.banner_Icon}
          resizeMode="cover"
        />
        <NameLayout Card={card} />
      </View>
    );
  };
  
  return (
    <View style={styles.swiper_Main_Con}>
      <Swiper
        ref={Ref}
        onSwipedRight={item => clickLike(Cards[item],false)}
        onSwipedTop={item => clickLike(Cards[item],true)}
        onSwipedBottom={()=>console.log('left and down swipe pending')}
        cards={Cards}
        cardIndex={CardIndex}
        cardVerticalMargin={scale(10)}
        backgroundColor={Color.White_Color}
        renderCard={renderCard}
        onSwipedAll={OnSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        // verticalSwipe={false}
        overlayLabels={{
          left: {
            title: Strings.nope,
            style: {
              label: styles.nope_Label,
              wrapper: styles.wrapper_Nope,
            },
          },
          right: {
            title: Strings.like,
            style: {
              label: styles.like_Label,
              wrapper: styles.like_Wrapper,
            },
          },
          top: {
            title: Strings.supperLike,
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
       ></Swiper>
    </View>
  );
};

export default SwiperLayout;
