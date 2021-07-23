import React from 'react';

import { Box, Text, Flex } from '@chakra-ui/react';

import './index.scss';
import { IchatMessage, IchatNotification } from '../../../../utils/interface';
import {
  ALARM_CHAT_MESSAGE_BACKGROUND_COLOR,
  ALARM_CHAT_MESSAGE_FONTSIZE,
  ALARM_CHAT_MESSAGE_TIME_FONTSIZE,
  ALARM_CHAT_MESSAGE_ID_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_CHAT_MESSAGE_NOTIFICATION_FONTSIZE,
} from '../../../../utils/constants';

const ChatMessage = ({ type, chatID, message, createdAt }: IchatMessage) => {
  return (
    <Flex flexDirection="column" alignItems={type === 'message' ? '' : 'flex-end'}>
      <Text
        pt="1"
        pb="0.5"
        fontSize={ALARM_CHAT_MESSAGE_ID_FONTSIZE}
        fontWeight={ALARM_CONTENT_FONTWEIGHT}
        ml="2.5"
        mr="2.5"
      >
        {chatID}
      </Text>
      <Flex alignItems="flex-end" flexDirection={type === 'message' ? 'row' : 'row-reverse'}>
        <Box
          className={type === 'ownerMessage' ? 'speech-bubble-right' : 'speech-bubble-left'}
          bg={ALARM_CHAT_MESSAGE_BACKGROUND_COLOR}
        >
          <Text fontSize={ALARM_CHAT_MESSAGE_FONTSIZE} fontWeight="semibold">
            {message}
          </Text>
        </Box>
        <Text pl="1" pr="1" fontSize={ALARM_CHAT_MESSAGE_TIME_FONTSIZE}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

const ChatNotification = ({ chatID, message }: IchatNotification) => {
  if (message === 'mute') {
    return (
      <Text p="1" fontSize={ALARM_CHAT_MESSAGE_NOTIFICATION_FONTSIZE} textAlign="center">
        {chatID}님이 음소거되었습니다.
      </Text>
    );
  } else if (message === 'enter') {
    return (
      <Text p="1" fontSize={ALARM_CHAT_MESSAGE_NOTIFICATION_FONTSIZE} textAlign="center">
        {chatID}님이 입장하셨습니다.
      </Text>
    );
  } else if (message === 'exit') {
    return (
      <Text p="1" fontSize={ALARM_CHAT_MESSAGE_NOTIFICATION_FONTSIZE} textAlign="center">
        {chatID}님이 채팅방을 나가셨습니다.
      </Text>
    );
  } else {
    return <Text>[Error: 0000]오류가 발생했습니다. 관리자에게 문의해주세요.</Text>;
  }
};

export const AlarmChatMessage = ({ type, chatID, message, createdAt }: IchatMessage) => {
  if (type === 'notification') {
    return <ChatNotification chatID={chatID} message={message} />;
  }
  return <ChatMessage type={type} chatID={chatID} message={message} createdAt={createdAt} />;
};
