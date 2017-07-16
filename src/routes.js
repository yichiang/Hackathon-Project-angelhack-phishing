import React from 'react';
import {  Route, BrowserRouter } from 'react-router-dom';
// import AuthService from 'utils/AuthService'

// import {Route} from 'react-router'
import App from './App';
import Home from './Home';
import Login from './Login'
import Container from './Container'

import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

// const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const auth = new Auth();

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

export const makeMainRoutes = () => {
  return (
    <BrowserRouter history={history} component={Container} auth={auth}>
        <div>
          <Route path="/home" render={(props) => <App auth={auth} {...props} />}  onEnter={requireAuth}/>
          <Route path="/" render={(props) => <Home auth={auth} {...props} />} onEnter={requireAuth} />
          <Route path="/login" render={(props) => <Login auth={auth} {...props} />} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </BrowserRouter>
  )
}

export default makeMainRoutes
