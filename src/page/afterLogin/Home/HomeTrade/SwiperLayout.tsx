import React, {FC} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import styles from './styles';
import {Strings, Color} from '@src/util';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/store';
import {checkPerfectMatch, sendNotification} from '@src/redux/LoginAction';
import NameLayout from './NameLayout';
import CustomImage from '@src/commonComponent/CustomImage/Image';
interface Props {
  Ref: any;
  OnSwipedAllCards: () => void;
  CardIndex: number;
  Cards: any;
  UserName: string | undefined;
  Active: boolean;
}

const SwiperLayout: FC<Props> = ({
  Ref,
  OnSwipedAllCards,
  CardIndex,
  Cards,
  UserName,
  Active,
}) => {
  const dispatch = useDispatch<any>();
  const {} = useSelector((state: RootState) => state.login_Reducer);
  const clickLike = (ITEM: any) => {
    let pars = {
      token: ITEM?.token,
      name: ITEM?.name,
      userId: ITEM?.id,
      userName: UserName,
      loginUserId: ITEM?.loginUserId,
    };
    dispatch(sendNotification(pars));
    dispatch(
      checkPerfectMatch({loginUserId: ITEM?.loginUserId, userId: ITEM?.id}),
    );
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
        onSwipedRight={item => clickLike(Cards[item])}
        cards={Cards}
        cardIndex={CardIndex}
        cardVerticalMargin={scale(10)}
        backgroundColor={Color.White_Color}
        renderCard={renderCard}
        onSwipedAll={OnSwipedAllCards}
        stackSize={3}
        stackSeparation={15}
        verticalSwipe={false}
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
        }}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard></Swiper>
    </View>
  );
};

export default SwiperLayout;
