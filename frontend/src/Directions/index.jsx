/* eslint-disable quotes */
import React,{setContext,jwtDecode} from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';
// import NoMatch from 'react-router-nomatch';
import Main from '../layout';

import Auth from 'pages/auth';

import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import Post from "../pages/post.jsx"



function Rout() {
  return (
    <Switch history={history}>
      <Route exact path="/" component={Auth} />
      <Main path="/">
        <Route
          
          
          component={({ match }) => (
            <>
              {/* <NoMatch component={E404}>
                <Route exact path="/" component={Home} />
              </NoMatch> */}
             
              <Route exact path="/home" component={Home} />
              <Route exact path="/profile/:username" component={Profile} />
              <Route exact path="/status/:username/:id" component={Post} />
            </>
          )}
        />
      </Main>
    </Switch>
  );
}

export default Rout;