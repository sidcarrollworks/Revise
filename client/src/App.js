import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/App.css';
import './styles/grid.css';

import Landing from './containers/landing.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Dashboard from './containers/dashboard.jsx';
import NotFound from './components/notFound.jsx';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}


export default App;
