import { AccordionButton, AccordionIcon, AccordionItem, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ALARM_TITLE_FONTSIZE, ALARM_TITLE_FONTWEIGHT } from '../../../utils/constants';

export const EmptyChat = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Text fontWeight={ALARM_TITLE_FONTWEIGHT} fontSize={ALARM_TITLE_FONTSIZE}>
              채팅
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
    </AccordionItem>
  );
};
