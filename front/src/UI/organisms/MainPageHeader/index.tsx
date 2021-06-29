import React from 'react';
import MainButtons from '../../molecules/MainButtons';
import ProfileLarge from '../../molecules/ProfileLarge';
import { Box } from '@chakra-ui/react';

const MainPageHeader = () => {
  return (
    <>
      <Box width="50%">
        <ProfileLarge />
      </Box>
      <Box width="50%">
        <MainButtons />
      </Box>
    </>
  );
};

export default MainPageHeader;
