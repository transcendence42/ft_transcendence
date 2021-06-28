import * as React from 'react';
import { ChakraProvider, Flex, Box, theme, Center } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from './UI/organisms/Navigation';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Game from './pages/Game';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Flex minH="100vh" flexDirection="row">
        <Box width="85px">
          <Navigation />
        </Box>
        <Center width="full">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
          </Switch>
        </Center>
        <Box width="390px" bg="green" />
      </Flex>
    </Router>
  </ChakraProvider>
);
