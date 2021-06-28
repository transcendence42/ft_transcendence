import * as React from 'react';
import { ChakraProvider, Flex, Box, theme, Center } from '@chakra-ui/react';

import { Navigation } from './UI/organisms/Navigation';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex minH="100vh" flexDirection="row">
      <Box width="85px">
        <Navigation />
      </Box>
      <Center width="full"></Center>
      <Box width="390px" bg="green" />
    </Flex>
  </ChakraProvider>
);
