import React from 'react';
import { Flex, Box, Center } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navigation } from '../../UI/organisms/Navigation';
import Main from '../../pages/Main';
import Profile from '../../pages/Profile';
import Chat from '../../pages/Chat';
import Game from '../../pages/Game';

const Layout = () => {
  return (
    <>
      <Flex minH="100vh" flexDirection="row">
        <Box width="85px">
          <Navigation></Navigation>
          <Router>
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
          </Router>
        </Box>
        <Center width="full"></Center>
        <Box width="390px" bg="green" />
      </Flex>
    </>
  );
};

export default Layout;
