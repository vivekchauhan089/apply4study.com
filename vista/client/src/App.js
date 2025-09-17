/* eslint-disable no-unused-vars */
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserRouter from './components/router';

export default function App () {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/landing"><Dashboard /></Route>
            <Route exact path="/"><UserRouter /></Route>
            <Route exact path="/login"><UserRouter /></Route>
            <Route exact path="/register"><UserRouter /></Route>
            <Route path="/course"><Dashboard /></Route>
            
          </Switch>
        </Router>
      </React.Fragment>
    )
}
