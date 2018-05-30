import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './styles/App.css';
import './styles/grid.css';

import Landing from './components/landing.jsx';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Dashboard from './containers/dashboard.jsx';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="header">
          <Route path="/" component={Navbar} />
        </div>
        <div className="siteComponents">
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
        <div className="footer">
          <Route id="footer" path="/" component={Footer} />
        </div>
      </div>
    );
  }
}


export default App;
