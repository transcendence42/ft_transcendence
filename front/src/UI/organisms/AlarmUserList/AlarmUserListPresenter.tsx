import React from 'react';

import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex } from '@chakra-ui/react';

import { AlarmUser } from '../../molecules';
import {
  ALARM_TITLE_FONTWEIGHT,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_TITLE_FONTSIZE,
  ALARM_USER_LIST_TITLE_COUNT_FONTSIZE,
  ALARM_BACKGROUND_COLOR,
} from '../../../utils/constants';

export const AlarmUserListPresenter = ({ data, myId }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Flex alignItems="center">
              <Text fontWeight={ALARM_TITLE_FONTWEIGHT} fontSize={ALARM_TITLE_FONTSIZE}>
                친구목록
              </Text>
              <Text pl="2" fontWeight={ALARM_CONTENT_FONTWEIGHT} fontSize={ALARM_USER_LIST_TITLE_COUNT_FONTSIZE}>{`(${
                data.filter(({ following }) => following?.userState !== 'logout').length
              }/${data.length})`}</Text>
            </Flex>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pl={1} pb={2} pt={1} bg={ALARM_BACKGROUND_COLOR}>
        {data.map(({ following }) => {
          if (following) {
            const { index, userID, userState, avatar } = following;
            return <AlarmUser key={index} nickName={userID} userState={userState} avatar={avatar} myId={myId} />;
          }
          return null;
        })}
      </AccordionPanel>
    </AccordionItem>
  );
};
