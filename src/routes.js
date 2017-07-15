import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Home from './Home';

export default (
  <Route  path="/" component={App}>
      <IndexRoute component={Home}/>
  </Route>
);
