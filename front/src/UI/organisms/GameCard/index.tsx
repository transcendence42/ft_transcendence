import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import ProfileMedium from '../../molecules/ProfileMedium';

const GameCard = () => {
  return (
    <>
      <Box backgroundColor="white" w="290px" h="290px" maxW="md" borderRadius="lg" textAlign="center">
        <Box
          h="30px"
          backgroundColor="lightblue"
          borderTopRadius="lg"
          display="flex"
          justifyContent="space-between"
        ></Box>
        <Box margin="0.3rem" display="flex" justifyContent="center" alignItems="center">
          <ProfileMedium />
          <Text fontSize="lg">VS</Text>
          <ProfileMedium />
        </Box>
        <Box margin="0.3rem" display="flex" justifyContent="space-evenly">
          <Text fontSize="2xl">3</Text>
          <Text fontSize="2xl">:</Text>
          <Text fontSize="2xl">2</Text>
        </Box>
        <Button margin="0.3rem">관전하기</Button>
      </Box>
    </>
  );
};

export default GameCard;
