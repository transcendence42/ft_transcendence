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
  TOAST_PLAY_GAME_TITLE,
  TOAST_PLAY_GAME_DESCRIPTION,
} from '../../../../utils/constants';
import { GAME_WITH_FRIEND, CREATE_DM, CREATE_ALARM } from './AlarmUserQuery';
import { currentChatVar } from '../../../../apollo/apolloProvider';

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
  const [createDM] = useMutation(CREATE_DM);
  const [createAlarm] = useMutation(CREATE_ALARM);

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

  const handleSendMessage = async () => {
    await createDM({
      variables: {
        user1: myId,
        user2: nickName,
      },
    }).then((res) => {
      currentChatVar(res.data.createDM.uuid);
    });
    await createAlarm({
      variables: {
        alarm: {
          userID: nickName,
          title: 'DM',
          content: `${myId}님이 메시지를 보내셨습니다.`,
          type: 'DM',
          link: '/chat',
        },
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
          history.push({
            pathname: `/profile/${nickName}`,
            state: {
              userID: myId,
            },
          });
          break;
        case 'send-message':
          handleSendMessage();
          break;
        case 'add-friend':
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
