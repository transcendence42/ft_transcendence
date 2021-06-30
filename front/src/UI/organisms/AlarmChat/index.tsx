import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmChatMessage } from '../../molecules';
import { PersonIcon, LockIcon } from '../../../utils/icons';
import { dummyChatData } from '../../../utils/dummy';
import {
  AlarmTitleFontWeight,
  AlarmTitleFontSize,
  AlarmContentFontWeight,
  AlarmChatTitleContentFontSize,
  AlarmBackgroundColor,
} from '../../../utils/constants';

export const AlarmChat = () => {
  const { chat, chatLog } = dummyChatData;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex flexDirection="row" alignItems="center">
              <Text fontWeight={AlarmTitleFontWeight} fontSize={AlarmTitleFontSize}>
                채팅
              </Text>
              <Flex flexDirection="row" alignItems="center">
                <Text pl="2" fontSize={AlarmChatTitleContentFontSize} fontWeight={AlarmContentFontWeight}>
                  #{chat.index} {chat.name} (
                </Text>
                <Box pr="1">
                  <PersonIcon />
                </Box>
                <Text fontSize={AlarmChatTitleContentFontSize} fontWeight={AlarmContentFontWeight}>
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
      <AccordionPanel pb={4} bg={AlarmBackgroundColor}>
        <Flex flexDirection="column">
          {chatLog.map(({ index, type, chatId, message, createdAt }) => (
            <AlarmChatMessage key={index} type={type} chatID={chatId} message={message} createdAt={createdAt} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
