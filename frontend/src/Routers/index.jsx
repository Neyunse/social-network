/* eslint-disable quotes */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import NoMatch from 'react-router-nomatch';
import Main from 'layout';
// URL
import Home from 'Views/home';
import User from 'Views/user';
import Auth from 'Views/auth';
import post from 'Views/post'
function Router() {
  return (
    <Switch>
      <Route path="/" component={Auth} exact />
      <Main>
        <Route
          component={({ match }) => (
            <>
              {/* <NoMatch component={E404}>
                <Route exact path="/" component={Home} />
              </NoMatch> */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/u/:user" component={User} ></Route>
              <Route exact path="/s/:user/:pid" component={post} />
            </>
          )}
        />
      </Main>

    </Switch>
  );
}

export default Router;