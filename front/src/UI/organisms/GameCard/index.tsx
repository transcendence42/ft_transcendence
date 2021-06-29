import React from 'react';
import { Box, Text, Button, Icon } from '@chakra-ui/react';
import { MdTimer } from 'react-icons/md';
import ProfileMedium from '../../molecules/ProfileMedium';

interface PlayerInfo {
  name?: string;
  imageSrc?: string;
  ranking?: string;
  totalWin?: number;
  totalLose?: number;
  currentScore?: number;
}

interface GameCardProps {
  playerA: PlayerInfo;
  playerB: PlayerInfo;
  startTime: Date;
}

const getRunningTime = (startTime: Date) => {
  return `00:00`;
};

const GameCard = ({ playerA, playerB, startTime }: GameCardProps) => {
  return (
    <>
      <Box backgroundColor="white" w="290px" h="290px" maxW="md" borderRadius="lg" textAlign="center">
        <Box
          h="30px"
          backgroundColor="lightblue"
          borderTopRadius="lg"
          display="flex"
          justifyContent="flex-end"
          alignContent="center"
          paddingRight="0.5rem"
        >
          <div>
            <Icon as={MdTimer} />
            {getRunningTime(startTime)}
          </div>
        </Box>
        <Box margin="0.3rem" display="flex" justifyContent="center" alignItems="center">
          <ProfileMedium
            name={playerA.name}
            imageSrc={playerA.imageSrc}
            ranking={playerA.ranking}
            totalWin={playerA.totalWin}
            totalLose={playerA.totalLose}
          />
          <Text fontSize="lg">VS</Text>
          <ProfileMedium
            name={playerB.name}
            imageSrc={playerB.imageSrc}
            ranking={playerB.ranking}
            totalWin={playerB.totalWin}
            totalLose={playerB.totalLose}
          />
        </Box>
        <Box margin="0.3rem" display="flex" justifyContent="space-evenly">
          <Text fontSize="2xl">{playerA.currentScore}</Text>
          <Text fontSize="2xl">:</Text>
          <Text fontSize="2xl">{playerB.currentScore}</Text>
        </Box>
        <Button margin="0.3rem">관전하기</Button>
      </Box>
    </>
  );
};

export default GameCard;
