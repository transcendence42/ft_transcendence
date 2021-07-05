import React, { useState, useEffect, useMemo } from 'react';
import { Box, Text, Button, Icon } from '@chakra-ui/react';
import { MdTimer } from 'react-icons/md';
import ProfileMedium from '../../molecules/ProfileMedium';
import { GameCardProps } from '../../../utils/interface';
import './index.scss';

const getRunningTime = (isoStartTime: Date): string => {
  const currentTime: Date = new Date();
  const rawGameTime = currentTime.getTime() - isoStartTime.getTime();
  const min = String(Math.floor(rawGameTime / 1000 / 60));
  const sec = String(Math.floor(rawGameTime / 1000) - Number(min) * 60);
  return `${min}:${sec}`;
};

const GameCard = ({ playerA, playerB, startTime }: GameCardProps) => {
  const isoStartTime: Date = useMemo(() => new Date(startTime), [startTime]);
  const [runningTime, setRunningTime] = useState(getRunningTime(isoStartTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTime(getRunningTime(isoStartTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime]);

  return (
    <>
      <Box className="game-card">
        <Box className="game-card-running-time-section">
          <div>
            <Icon as={MdTimer} />
            {runningTime}
          </div>
        </Box>
        <Box className="game-card-profile-section">
          <ProfileMedium
            name={playerA.name}
            imageSrc={playerA.imageSrc}
            ranking={playerA.ranking}
            totalWin={playerA.totalWin}
            totalLose={playerA.totalLose}
            currentScore={playerA.currentScore}
          />
          <Text className="game-card-vs">VS</Text>
          <ProfileMedium
            name={playerB.name}
            imageSrc={playerB.imageSrc}
            ranking={playerB.ranking}
            totalWin={playerB.totalWin}
            totalLose={playerB.totalLose}
            currentScore={playerB.currentScore}
          />
        </Box>
        <Button margin="0.3rem">관전하기</Button>
      </Box>
    </>
  );
};

export default GameCard;
