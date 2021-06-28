import React, { ReactNode } from 'react';
import { Flex, Box, Avatar } from '@chakra-ui/react';
import UserInfoCard from '../../molecules/UserInfoCard';

interface ProfileLargeProps {
  name?: string;
  imageSrc?: string;
  ranking?: string;
  ladderScore?: string;
  winningPercentage?: number;
  totalWin?: number;
  totalLose?: number;
  rightComponent?: ReactNode;
}

const dummyRightcomponent = <div>dummy right</div>;

const ProfileLarge = ({
  name = 'user',
  imageSrc = '',
  ranking = 'unknown',
  ladderScore = 'unknown',
  winningPercentage = 0,
  totalWin = 0,
  totalLose = 0,
  rightComponent = dummyRightcomponent,
}: ProfileLargeProps) => {
  return (
    <Flex height="160px" flexDirection="row" alignItems="center">
      <Box display="flex" flexDirection="row" alignItems="center" width="50%">
        <Avatar size="xl" margin="1rem" name={name} src={imageSrc} />
        <UserInfoCard
          name={name}
          ranking={ranking}
          ladderScore={ladderScore}
          winningPercentage={winningPercentage}
          totalWin={totalWin}
          totalLose={totalLose}
        />
      </Box>
      <Box height="100%" width="50%">
        {rightComponent}
      </Box>
    </Flex>
  );
};

export default ProfileLarge;
