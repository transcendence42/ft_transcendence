import React from 'react';
import { Flex, Box, Center } from '@chakra-ui/react';

const Layout = () => {
  return (
    <>
      <Flex minH="100vh" flexDirection="row">
        <Box width="85px"></Box>
        <Center width="full"></Center>
        <Box width="390px" bg="green" />
      </Flex>
    </>
  );
};

export default Layout;
