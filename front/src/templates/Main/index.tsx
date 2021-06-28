import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const MainPageTemplate = () => {
  return (
    <Flex minH="100vh" width="920px" margin="20px" flexDirection="column">
      <Box minH="180px" backgroundColor="blue">
        <div>상단 프로필</div>
      </Box>
      <Box backgroundColor="red">
        <div>하단 내용 </div>
      </Box>
    </Flex>
  );
};

export default MainPageTemplate;
