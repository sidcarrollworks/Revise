import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './styles/App.css';

import Landing from './components/landing.jsx';
import Navbar from './components/navbar.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Dashboard from './containers/dashboard.jsx';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}


export default App;
