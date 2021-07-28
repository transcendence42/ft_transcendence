import React from 'react';
import { ProfileLarge } from '../../molecules/ProfileLarge';
import { Box } from '@chakra-ui/react';
import './index.scss';

const GamePageHeader = () => {
  return (
    <>
      <Box>
        <ProfileLarge />
      </Box>
      <Box className="vs-card">VS</Box>
      <Box>
        <ProfileLarge reverse={true} />
      </Box>
    </>
  );
};

export default GamePageHeader;
