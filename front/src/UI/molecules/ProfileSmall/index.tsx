import React from 'react';

import { Flex, Box, Avatar, Text } from '@chakra-ui/react';

const logoutIcon = () => {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 9.00049C5.5 8.80157 5.57902 8.61081 5.71967 8.47016C5.86032 8.3295 6.05108 8.25049 6.25 8.25049H13V3.37549C13 1.87549 11.4161 0.750488 10 0.750488H2.875C2.17903 0.751233 1.51179 1.02803 1.01967 1.52016C0.527545 2.01228 0.250744 2.67952 0.25 3.37549V14.6255C0.250744 15.3214 0.527545 15.9887 1.01967 16.4808C1.51179 16.9729 2.17903 17.2497 2.875 17.2505H10.375C11.071 17.2497 11.7382 16.9729 12.2303 16.4808C12.7224 15.9887 12.9992 15.3214 13 14.6255V9.75049H6.25C6.05108 9.75049 5.86032 9.67147 5.71967 9.53082C5.57902 9.39016 5.5 9.1994 5.5 9.00049Z"
        fill="#319795"
      />
      <path
        d="M19.5302 8.47165L15.7802 4.72165C15.6384 4.58693 15.4495 4.51294 15.254 4.51544C15.0584 4.51795 14.8715 4.59675 14.7332 4.73505C14.5949 4.87335 14.5161 5.06021 14.5136 5.25578C14.5111 5.45135 14.5851 5.64016 14.7198 5.78196L17.1892 8.2518H13V9.7518H17.1892L14.7198 12.2216C14.6473 12.2906 14.5892 12.3734 14.5492 12.4651C14.5091 12.5568 14.4878 12.6557 14.4865 12.7558C14.4852 12.8559 14.504 12.9552 14.5417 13.0479C14.5794 13.1407 14.6353 13.2249 14.7061 13.2957C14.7769 13.3665 14.8611 13.4224 14.9539 13.4601C15.0466 13.4978 15.1459 13.5166 15.246 13.5153C15.3461 13.514 15.445 13.4927 15.5367 13.4526C15.6284 13.4126 15.7112 13.3545 15.7802 13.282L19.5302 9.53196C19.6707 9.39132 19.7496 9.20063 19.7496 9.0018C19.7496 8.80297 19.6707 8.61228 19.5302 8.47165Z"
        fill="#319795"
      />
    </svg>
  );
};

interface IUser {
  nickname: string;
  totalWin: number;
  totalLose: number;
  radderRating: number;
  ranking: number;
}

const winRate = (totalWin: number, totalLose: number) => {
  return Math.floor((totalWin / (totalWin + totalLose)) * 100);
};

export const ProfileSmall = ({ nickname, totalWin, totalLose, radderRating, ranking }: IUser) => {
  const totalRating = winRate(totalWin, totalLose);
  return (
    <Flex alignItems="center">
      <Box p="4" bg="gray.100">
        <Avatar size="sm" bg="teal.500" />
      </Box>
      <Box>
        <Text fontWeight="semibold" fontSize="16px">
          {nickname}
        </Text>
        <Text
          fontWeight="semibold"
          fontSize="12px"
        >{`${totalWin}승 ${totalLose}패 (${totalRating}%) | 래더 ${radderRating}점 (${ranking}위)`}</Text>
      </Box>
      <Box bg="gray.100" position="fixed" right="1rem">
        {logoutIcon()}
      </Box>
    </Flex>
  );
};
