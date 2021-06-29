import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmMessage } from '../../atoms/AlarmMessage';

const messageData = [
  {
    id: '123412a',
    title: '친구요청',
    content: '42_Dall 님이 친구 요청을 보냈습니다.',
    alarmTime: '1시간전',
  },
  {
    id: '3242323a',
    title: '게임패배',
    content: 'jwon 님과 경기에서 패배했습니다.',
    alarmTime: '1시간전',
  },
  {
    id: '12334a',
    title: '게임승리',
    content: 'Polarbear 님과 경기에서 승리했습니다.',
    alarmTime: '1시간전',
  },
];

export interface IalarmMessage {
  title: string;
  content: string;
  alarmTime: string;
}

export const AlarmNotifier = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight="bold" fontSize="1rem">
              알림
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pr={1} pb={0.5} pt={0.5} bg="gray.50">
        <Flex flexDirection="column">
          {messageData.map(({ id, title, content, alarmTime }) => (
            <AlarmMessage key={id} title={title} content={content} alarmTime={alarmTime} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
