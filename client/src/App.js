import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './styles/App.css';
import './styles/grid.css';

import Landing from './containers/landing.jsx';
import Login from './components/login_signup/login.jsx';
import Signup from './components/login_signup/signup.jsx';
import Dashboard from './containers/dashboard.jsx';
import NotFound from './components/notFound.jsx';
import ProjectPage from './containers/projectPage.jsx';

import { AuthProvider } from './contexts/authContext.jsx';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='App'>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/project/:id" component={ProjectPage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}


export default App;
