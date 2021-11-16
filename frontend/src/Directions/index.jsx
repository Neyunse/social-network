/* eslint-disable quotes */
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
// import NoMatch from 'react-router-nomatch';
import Main from '../layout';

import Auth from 'pages/auth';

import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';


function Rout() {
  return (
    <Switch>
      <Route exact path="/" component={Auth} />
      <Main path="/">
        <Route
          history={history}
          
          component={({ match }) => (
            <>
              {/* <NoMatch component={E404}>
                <Route exact path="/" component={Home} />
              </NoMatch> */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile/:username" component={Profile} />
            </>
          )}
        />
      </Main>
    </Switch>
  );
}

export default Rout;