import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';
import './index.scss';

interface ProfileMediumProps {
  name?: string;
  imageSrc?: string;
  ranking?: string;
  totalWin?: number;
  totalLose?: number;
}

const calculateWinningRate = (totalWin: number, totalLose: number) => {
  return Math.floor((totalWin / (totalWin + totalLose)) * 100);
};

const ProfileMedium = ({
  name = 'unknown',
  imageSrc = '',
  ranking = '?',
  totalWin = 0,
  totalLose = 0,
}: ProfileMediumProps) => {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" className="profile-medium">
        <Avatar size="md" margin="1rem" name={name} src={imageSrc}></Avatar>
        <div className="profie-medium-inner-card">
          <div>
            <strong>{name}</strong>
          </div>
          <div>래더 랭킹 {ranking}위</div>
          <div>
            {totalWin}승 {totalLose}패({calculateWinningRate(totalWin, totalLose)}%)
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProfileMedium;
