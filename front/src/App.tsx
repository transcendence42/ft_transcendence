import React from 'react';
import { ChakraProvider, Flex, Box, theme, Center } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navigation } from './UI/organisms/Navigation';
import { Alarm } from './UI/organisms/Alarm';
import { getCookies } from './utils/util';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Game from './pages/Game';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        {getCookies('access_token') ? (
          <Flex minH="100vh" minWidth="1395px" flexDirection="row">
            <Box width="85px" minWidth="85px" maxWidth="85px">
              <Navigation />
            </Box>
            <Center width="full" minWidth="965px">
              <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/:userID" component={Profile} />
                <Route path="/chat" component={Chat} />
                <Route path="/game" component={Game} />
                <Route path="/404" component={NotFound} />
                <Redirect from="*" to="/404" />
              </Switch>
            </Center>
            <Box width="390px" minWidth="390px" maxWidth="390px">
              <Alarm />
            </Box>
          </Flex>
        ) : (
          <Login />
        )}
      </Router>
    </ChakraProvider>
  );
};

export default App;
