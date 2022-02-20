import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
