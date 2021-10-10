import React, { useRef } from 'react';

import { Avatar, AvatarBadge, Flex, Box, Text, useToast } from '@chakra-ui/react';
import { ContextMenu } from 'holee-contextmenu';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
  ALARM_MESSAGE_LOGIN_USER_STATE_COLOR,
  ALARM_MESSAGE_PENDING_USER_STATE_COLOR,
  ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_USER_NICKNAME_FONTSIZE,
  TOAST_DURATION,
  TOAST_SEND_MESSAGE_TITLE,
  TOAST_SEND_MESSAGE_DESCRIPTION,
  TOAST_ADD_FRIEND_TITLE,
  TOAST_ADD_FRIEND_DESCRIPTION,
  TOAST_PLAY_GAME_TITLE,
  TOAST_PLAY_GAME_DESCRIPTION,
} from '../../../../utils/constants';
import { GAME_WITH_FRIEND } from './AlarmUserQuery';

export const AlarmUser = ({
  nickName,
  userState,
  avatar,
  myId,
}: {
  nickName: string;
  userState: string;
  avatar: string;
  myId: string;
}) => {
  const history = useHistory();
  const [gameWithFriend] = useMutation(GAME_WITH_FRIEND, {
    variables: {
      players: {
        playerOneID: nickName,
        playerTwoID: myId,
      },
    },
  });

  const gameQueue = async (myId: string, userID: string) => {
    await gameWithFriend({
      variables: {
        players: {
          playerOneID: userID,
          playerTwoID: myId,
        },
      },
    });
  };

  const redirectGamePage = () => {
    history.push({
      pathname: '/game',
      state: {
        userID: myId,
      },
    });
  };

  const outerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();
  let avatarState = '';

  if (userState === 'login') {
    avatarState = ALARM_MESSAGE_LOGIN_USER_STATE_COLOR;
  } else if (userState === 'playing') {
    avatarState = ALARM_MESSAGE_PENDING_USER_STATE_COLOR;
  } else if (userState === 'logout') {
    avatarState = ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR;
  }

  const menuOnClickHandler = (e: React.MouseEvent | React.KeyboardEvent<HTMLUListElement>) => {
    const eventTarget = e.target as HTMLUListElement;
    if (eventTarget) {
      switch (eventTarget.dataset.option) {
        case 'profile':
          break;
        case 'send-message':
          toast({
            title: TOAST_SEND_MESSAGE_TITLE,
            description: TOAST_SEND_MESSAGE_DESCRIPTION,
            status: 'success',
            duration: TOAST_DURATION,
            isClosable: true,
          });
          break;
        case 'add-friend':
          toast({
            title: TOAST_ADD_FRIEND_TITLE,
            description: TOAST_ADD_FRIEND_DESCRIPTION,
            status: 'success',
            duration: TOAST_DURATION,
            isClosable: true,
          });
          break;
        case 'play-game':
          gameQueue(myId, nickName);
          redirectGamePage();
          toast({
            title: TOAST_PLAY_GAME_TITLE,
            description: TOAST_PLAY_GAME_DESCRIPTION,
            status: 'success',
            duration: TOAST_DURATION,
            isClosable: true,
          });
          break;
        default:
      }
    }
  };

  return (
    <>
      <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        <li data-option="profile">{nickName}의 프로필 보기</li>
        <li data-option="send-message">메세지 보내기</li>
        <li data-option="add-friend">친구추가 요청</li>
        <li data-option="play-game">핑퐁게임 요청</li>
      </ContextMenu>
      <Flex p="2" justifyContent="flex-start" ref={outerRef}>
        <Box>
          <Avatar size="xs" src={avatar}>
            <AvatarBadge boxSize="1.25em" bg={avatarState} />
          </Avatar>
        </Box>
        <Box pl="4">
          <Text fontSize={ALARM_USER_NICKNAME_FONTSIZE} fontWeight={ALARM_CONTENT_FONTWEIGHT}>
            {nickName}
          </Text>
        </Box>
      </Flex>
    </>
  );
};
