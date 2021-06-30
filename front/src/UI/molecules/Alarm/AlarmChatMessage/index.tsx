import React from 'react';

import { Box, Text, Flex } from '@chakra-ui/react';
import { IchatMessage, IchatNotification } from '../../../../utils/interface';

import {
  AlarmChatMessageBackgroundColor,
  AlarmChatMessageFontSize,
  AlarmChatMessageTimeFontSize,
  AlarmChatMessageIDFontSize,
  AlarmContentFontWeight,
  AlarmChatMessageNotificationFontSize,
} from '../../../../utils/constants';

const ChatMessage = ({ type, chatID, message, createdAt }: IchatMessage) => {
  return (
    <Flex flexDirection="column" alignItems={type === 'message' ? '' : 'flex-end'}>
      <Text pt="1" pb="0.5" fontSize={AlarmChatMessageIDFontSize} fontWeight={AlarmContentFontWeight}>
        {chatID}
      </Text>
      <Flex alignItems="flex-end" flexDirection={type === 'message' ? 'row' : 'row-reverse'}>
        <Box p="2" border="1px solid black" borderRadius="15%" bg={AlarmChatMessageBackgroundColor}>
          <Text fontSize={AlarmChatMessageFontSize} fontWeight="semibold">
            {message}
          </Text>
        </Box>
        <Text pl="1" pr="1" fontSize={AlarmChatMessageTimeFontSize}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

const ChatNotification = ({ chatID, message }: IchatNotification) => {
  if (message === 'mute') {
    return (
      <Text p="1" fontSize={AlarmChatMessageNotificationFontSize} textAlign="center">
        {chatID}님이 음소거되었습니다.
      </Text>
    );
  } else if (message === 'enter') {
    return (
      <Text p="1" fontSize={AlarmChatMessageNotificationFontSize} textAlign="center">
        {chatID}님이 입장하셨습니다.
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
