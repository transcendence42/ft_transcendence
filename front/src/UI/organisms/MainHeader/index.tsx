import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import ProfileLarge from '../../molecules/ProfileLarge';

interface MainHeaderProps {
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

const MainHeader = ({
  name = 'user',
  imageSrc = '',
  ranking = 'unknown',
  ladderScore = 'unknown',
  winningPercentage = 0,
  totalWin = 0,
  totalLose = 0,
  rightComponent = dummyRightcomponent,
}: MainHeaderProps) => {
  return (
    <Flex height="160px" flexDirection="row" alignItems="center">
      <Box display="flex" flexDirection="row" alignItems="center" width="50%">
        <ProfileLarge
          name={name}
          imageSrc={imageSrc}
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

export default MainHeader;
