import React, { useRef } from 'react';

import { Avatar, AvatarBadge, Flex, Box, Text } from '@chakra-ui/react';
import { ContextMenu } from 'holee-contextmenu';

import {
  ALARM_MESSAGE_LOGIN_USER_STATE_COLOR,
  ALARM_MESSAGE_PENDING_USER_STATE_COLOR,
  ALARM_MESSAGE_LOGOUT_USER_STATE_COLOR,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_USER_NICKNAME_FONTSIZE,
} from '../../../../utils/constants';

export const AlarmUser = ({ nickName, userState, avatar }: { nickName: string; userState: string; avatar: string }) => {
  const outerRef = useRef<HTMLDivElement>(null);
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
      console.log(eventTarget.dataset.option);
    }
  };

  return (
    <>
      <ContextMenu outerRef={outerRef} menuOnClick={(e) => menuOnClickHandler(e)}>
        <li data-option="profile">profile</li>
        <li data-option="send-message">send message</li>
        <li data-option="add-friend">add friend</li>
        <li data-option="play-game">play game</li>
        <li data-option="register-admin">register admin(dismissal)</li>
        <li data-option="block">block(unblock)</li>
        <li data-option="mute">mute(unmute)</li>
        <li data-option="forced-out">forced out</li>
      </ContextMenu>
      <div style={{ backgroundColor: 'red', width: '380' }} ref={outerRef}>
        <Flex p="2" justifyContent="flex-start">
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
      </div>
    </>
  );
};
