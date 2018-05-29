import React, { Component } from 'react';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';

class Testu extends Component {
  render() {
    return (
      <h1>im BITCH -_____^^^^^______-</h1>
    );
  }
}
class Home extends Component {
  render() {
    return (
      <h1>Hello dude</h1>
    );
  }
} 
class Nick extends Component {
  render() {
    return (
      <h1>im nick -______________-</h1>
    );
  }
}
class Four_0_4 extends Component {
  render() {
    return (
      <h1>404 ERROR</h1>
    );
  }
}

=======
import { Route } from 'react-router-dom';

import './styles/App.css';

import Landing from './components/landing';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './containers/dashboard';
>>>>>>> origin/react-setup

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <Route path="/" component={Home} />
        <Switch>
          <Route exact path="/" component={Nick} />
          <Route path="/sss" component={Testu} />
          <Route component={Four_0_4} />
        </Switch>
=======
      <div className='App'>
        <Route path="/" component={Navbar} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
>>>>>>> origin/react-setup
      </div>
    );
  }
}


export default App;
