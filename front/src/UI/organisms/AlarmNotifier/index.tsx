import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmMessage } from '../../molecules';
import { messageData } from '../../../utils/dummy';
import { AlarmTitleFontWeight, AlarmBackgroundColor, AlarmTitleFontSize } from '../../../utils/constants';

export const AlarmNotifier = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight={AlarmTitleFontWeight} fontSize={AlarmTitleFontSize}>
              알림
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pr={1} pb={0.5} pt={0.5} bg={AlarmBackgroundColor}>
        <Flex flexDirection="column">
          {messageData.map(({ id, title, content, alarmTime }) => (
            <AlarmMessage key={id} title={title} content={content} alarmTime={alarmTime} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};
