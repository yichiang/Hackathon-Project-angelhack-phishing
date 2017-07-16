import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router,  Route, Link } from 'react-router-dom'
import {  database} from './Service';

import Home from './Home';
import App from './App';
import './index.css';


import { makeMainRoutes } from './routes';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);


registerServiceWorker();
