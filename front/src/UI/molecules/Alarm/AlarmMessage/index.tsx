import React from 'react';

import { Box, Text, Avatar, Grid, Flex, CloseButton } from '@chakra-ui/react';

import { IalarmMessage } from '../../../../utils/interface';
import {
  AlarmMessageBackgroundColor,
  AlarmMessageTitleFontSize,
  AlarmMessageContentFontSize,
  AlarmMessageHeight,
  AlarmMessageWidth,
  AlarmContentFontWeight,
} from '../../../../utils/constants';

export const AlarmMessage = ({ title, content, alarmTime }: IalarmMessage) => {
  return (
    <Box
      mb="0.5"
      mt="0.5"
      p="2"
      bg={AlarmMessageBackgroundColor}
      borderRadius="5"
      width={AlarmMessageWidth}
      height={AlarmMessageHeight}
    >
      <Grid templateColumns="1fr 10fr">
        <Box>
          <Avatar size="xs" />
        </Box>
        <Flex flexDirection="column">
          <Box>
            <Flex justifyContent="space-between">
              <Text fontWeight={AlarmContentFontWeight} fontSize={AlarmMessageTitleFontSize}>
                {title}
              </Text>
              <CloseButton pb="2" size="sm" />
            </Flex>
          </Box>
          <Box>
            <Flex justifyContent="space-between">
              <Text pt="2" fontSize={AlarmMessageContentFontSize}>
                {content}
              </Text>
              <Text pt="2" fontSize={AlarmMessageContentFontSize}>
                {alarmTime}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
};
