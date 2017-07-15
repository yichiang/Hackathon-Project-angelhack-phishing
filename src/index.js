import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom'
import {  database} from './Service';

import Home from './Home';
import App from './App';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={(props) => <App {...props}/>} />
      <Route path="/home" component={Home} />
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
