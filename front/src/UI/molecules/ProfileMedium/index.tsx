import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { winRate } from '../../../utils/util';
import { ProfileMediumProps } from '../../../utils/interface';
import './index.scss';

const ProfileMedium = ({
  name = 'unknown',
  imageSrc = '',
  ranking = '?',
  totalWin = 0,
  totalLose = 0,
  currentScore,
}: ProfileMediumProps) => {
  return (
    <>
      <Box className="profile-medium">
        <Avatar size="md" margin="1rem" name={name} src={imageSrc}></Avatar>
        <div className="profie-medium-inner-card">
          <div>
            <strong>{name}</strong>
          </div>
          <div>래더 랭킹 {ranking}위</div>
          <div>
            {totalWin}승 {totalLose}패({winRate(totalWin, totalLose)}%)
          </div>
          <Text className="profile-medium-score" fontSize="2xl">
            {currentScore}
          </Text>
        </div>
      </Box>
    </>
  );
};

export default ProfileMedium;
