import * as React from 'react';
// import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, GridItem, theme } from '@chakra-ui/react';
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

{
  /* <Box textAlign="center" fontSize="xl">
<Grid minH="100vh" p={3}>
  <VStack spacing={8}>
    <Logo h="40vmin" pointerEvents="none" />
    <Text>
      Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
    </Text>
    <Link color="teal.500" href="https://chakra-ui.com" fontSize="2xl" target="_blank" rel="noopener noreferrer">
      Hello world
    </Link>
  </VStack>
</Grid>
</Box> */
}
