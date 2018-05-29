import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="welcome">
            <div className="welcomeElements">
                <h1>Welcome to revise.work</h1>
                <br/>
                <Link className="getStarted" to="/signup">Create Account</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Landing;