import React from 'react';

import { Box, Text, Flex } from '@chakra-ui/react';

const ChatMessage = ({
  type,
  chatID,
  message,
  createdAt,
}: {
  type: string;
  chatID: string;
  message: string;
  createdAt: string;
}) => {
  return (
    <Flex flexDirection="column" alignItems={type === 'message' ? '' : 'flex-end'}>
      <Text pt="1" pb="0.5" fontSize="11px" fontWeight="semibold">
        {chatID}
      </Text>
      <Flex alignItems="flex-end" flexDirection={type === 'message' ? 'row' : 'row-reverse'}>
        <Box p="2" border="1px solid black" borderRadius="15%" bg="gray.100">
          <Text fontSize="14px" fontWeight="semibold">
            {message}
          </Text>
        </Box>
        <Text pl="1" pr="1" fontSize="9px">
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

const ChatNotification = ({
  type,
  chatID,
  message,
  createdAt,
}: {
  type: string;
  chatID: string;
  message: string;
  createdAt: string;
}) => {
  if (message === 'mute') {
    return (
      <Text p="1" fontSize="10px" textAlign="center">
        {chatID}님이 음소거되었습니다.
      </Text>
    );
  } else if (message === 'enter') {
    return (
      <Text p="1" fontSize="10px" textAlign="center">
        {chatID}님이 입장하셨습니다.
      </Text>
    );
  } else {
    return <Text>[Error: 0000]오류가 발생했습니다. 관리자에게 문의해주세요.</Text>;
  }
};

export const AlarmChatMessage = ({
  type,
  chatID,
  message,
  createdAt,
}: {
  type: string;
  chatID: string;
  message: string;
  createdAt: string;
}) => {
  if (type === 'notification') {
    return <ChatNotification type={type} chatID={chatID} message={message} createdAt={createdAt} />;
  }
  return <ChatMessage type={type} chatID={chatID} message={message} createdAt={createdAt} />;
};
