import React from 'react';
import { Grid } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavIcons } from '../../molecules/NavIcons';
import { NavigationData } from './NavigationData';

import Main from '../../../pages/Main';
import Profile from '../../../pages/Profile';
import Chat from '../../../pages/Chat';
import Game from '../../../pages/Game';

import './index.scss';

export const Navigation = () => {
  return (
    <Grid templateRows="repeat(5, 1fr)" gap={6}>
      <Router>
        <div className="navigation-container">
          <NavIcons NavigationData={NavigationData}></NavIcons>
        </div>
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
    </Grid>
  );
};
