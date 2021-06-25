import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavIcons } from '../../molecules/NavIcons';
import { NavigationData } from './NavigationData';

import Main from '../../../pages/Main';
import Profile from '../../../pages/Profile';
import Chat from '../../../pages/Chat';
import Game from '../../../pages/Game';

export const Navigation = () => {
  return (
    <>
      <Router>
        <NavIcons NavigationData={NavigationData}></NavIcons>
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
    </>
  );
};