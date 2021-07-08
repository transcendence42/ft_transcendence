import React from 'react';

import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import { winRate } from '../../../utils/util';
import { IProfileSmall } from '../../../utils/interface';
import {
  ALARM_PROFILE_NICKNAME_FONTSIZE,
  ALARM_CONTENT_FONTWEIGHT,
  ALARM_PROFILE_CONTENT_FONTSIZE,
} from '../../../utils/constants';

export const ProfileSmall = ({
  position,
  avatar,
  nickname,
  totalWin,
  totalLose,
  ladderRating,
  ranking,
  backgroundColor,
}: IProfileSmall) => {
  return (
    <>
      <Flex alignItems="center" flexDirection={position === 'left' ? 'row' : 'row-reverse'}>
        <Box p="4" bg={backgroundColor}>
          <Avatar size="sm" bg="teal.500" src={avatar} />
        </Box>
        <Box>
          <Flex flexDirection="column" pl={position === 'left' ? '0' : '4'}>
            <Text
              fontWeight={ALARM_CONTENT_FONTWEIGHT}
              fontSize={ALARM_PROFILE_NICKNAME_FONTSIZE}
              alignSelf={position === 'left' ? 'flex-start' : 'flex-end'}
            >
              {nickname}
            </Text>
            <Text
              fontWeight={ALARM_CONTENT_FONTWEIGHT}
              fontSize={ALARM_PROFILE_CONTENT_FONTSIZE}
            >{`${totalWin}승 ${totalLose}패 (${winRate(
              totalWin,
              totalLose,
            )}%) | 래더 ${ladderRating}점 (${ranking}위)`}</Text>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
