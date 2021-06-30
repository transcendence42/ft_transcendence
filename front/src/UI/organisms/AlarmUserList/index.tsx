import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmUser } from '../../molecules';
import { userData } from '../../../utils/dummy';
import {
  AlarmTitleFontWeight,
  AlarmContentFontWeight,
  AlarmTitleFontSize,
  AlarmUserListTitleCountFontSize,
  AlarmBackgroundColor,
} from '../../../utils/constants';

export const AlarmUserList = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex alignItems="center">
              <Text fontWeight={AlarmTitleFontWeight} fontSize={AlarmTitleFontSize}>
                친구목록
              </Text>
              <Text pl="2" fontWeight={AlarmContentFontWeight} fontSize={AlarmUserListTitleCountFontSize}>{`(${
                userData.filter(({ userState }) => userState !== 'logout').length
              }/${userData.length})`}</Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pb={2} pt={1} bg={AlarmBackgroundColor}>
        {userData.map(({ id, nickName, userState }) => {
          return <AlarmUser key={id} nickName={nickName} userState={userState} />;
        })}
      </AccordionPanel>
    </AccordionItem>
  );
};
