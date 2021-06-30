import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmChatMessage } from '../../atoms/AlarmChatMessage';

// mute, enter

const dummyChatData = {
  chat: {
    index: '3',
    type: 'private',
    name: '비공개방입니다',
    personnel: '8',
  },
  chatLog: [
    {
      index: '1',
      type: 'message',
      chatId: 'jwon',
      message: '반가워요 ㅋㅋㅋ',
      createdAt: '15:23',
    },
    {
      index: '6',
      type: 'notification',
      chatId: 'jwon',
      message: 'mute',
      createdAt: '15:23',
    },
    {
      index: '7',
      type: 'notification',
      chatId: 'holee',
      message: 'enter',
      createdAt: '15:23',
    },
    {
      index: '2',
      type: 'message',
      chatId: 'holee',
      message: '잘 지내셨어요??',
      createdAt: '15:23',
    },
    {
      index: '3',
      type: 'message',
      chatId: 'holee',
      message: '좋은 아침입니다.',
      createdAt: '15:23',
    },
    {
      index: '4',
      type: 'message',
      chatId: 'yshin',
      message: '반갑습니다',
      createdAt: '15:23',
    },
    {
      index: '5',
      type: 'ownerMessage',
      chatId: 'yechoi',
      message: '안녕하세요 :)',
      createdAt: '15:23',
    },
  ],
};

const PersonIcon = ({ fill = 'none' }) => {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6C6.63899 6 7.26362 5.82405 7.79492 5.49441C8.32622 5.16477 8.74031 4.69623 8.98484 4.14805C9.22937 3.59987 9.29335 2.99667 9.16869 2.41473C9.04403 1.83279 8.73633 1.29824 8.2845 0.878681C7.83267 0.459123 7.257 0.173401 6.63029 0.0576455C6.00358 -0.0581101 5.35398 0.00129984 4.76364 0.228363C4.17329 0.455426 3.66871 0.839943 3.31371 1.33329C2.95871 1.82664 2.76923 2.40666 2.76923 3C2.76923 3.79565 3.10961 4.55871 3.7155 5.12132C4.32139 5.68393 5.14315 6 6 6ZM6 6.85714C3.9975 6.85714 0 8.00571 0 10.2857V12H12V10.2857C12 8.00571 8.0025 6.85714 6 6.85714Z"
        fill="#2D3748"
      />
    </svg>
  );
};

const LockIcon = ({ fill = 'none' }) => {
  return (
    <svg width="10" height="14" viewBox="0 0 12 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 5.99975H9V3.49976C9 2.70411 8.68393 1.94104 8.12132 1.37844C7.55871 0.815826 6.79565 0.499756 6 0.499756C5.20435 0.499756 4.44129 0.815826 3.87868 1.37844C3.31607 1.94104 3 2.70411 3 3.49976V5.99975H2.5C1.96974 6.00033 1.46137 6.21123 1.08643 6.58618C0.711479 6.96113 0.500579 7.4695 0.5 7.99975V13.4998C0.500579 14.03 0.711479 14.5384 1.08643 14.9133C1.46137 15.2883 1.96974 15.4992 2.5 15.4998H9.5C10.0303 15.4992 10.5386 15.2883 10.9136 14.9133C11.2885 14.5384 11.4994 14.03 11.5 13.4998V7.99975C11.4994 7.4695 11.2885 6.96113 10.9136 6.58618C10.5386 6.21123 10.0303 6.00033 9.5 5.99975V5.99975ZM8 5.99975H4V3.49976C4 2.96932 4.21071 2.46061 4.58579 2.08554C4.96086 1.71047 5.46957 1.49976 6 1.49976C6.53043 1.49976 7.03914 1.71047 7.41421 2.08554C7.78929 2.46061 8 2.96932 8 3.49976V5.99975Z"
        fill="black"
      />
    </svg>
  );
};

export const AlarmChat = () => {
  // const { chatLog } = dummyChatData;
  const { chat, chatLog } = dummyChatData;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex flexDirection="row" alignItems="center">
              <Text fontWeight="bold" fontSize="1rem">
                채팅
              </Text>
              <Flex flexDirection="row" alignItems="center">
                <Text pl="2" fontSize="12" fontWeight="semibold">
                  #{chat.index} {chat.name} (
                </Text>
                <Box pr="1">
                  <PersonIcon />
                </Box>
                <Text fontSize="12" fontWeight="semibold">
                  {chat.personnel})
                </Text>
                {chat.type === 'private' ? (
                  <Box pl="2">
                    <LockIcon />
                  </Box>
                ) : (
                  ''
                )}
              </Flex>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="gray.50">
        <Flex flexDirection="column">
          {chatLog.map(({ index, type, chatId, message, createdAt }) => (
            <AlarmChatMessage key={index} type={type} chatID={chatId} message={message} createdAt={createdAt} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
