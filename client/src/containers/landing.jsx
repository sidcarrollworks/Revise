import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

import Header from "../components/landingPage/navbar.jsx";
import Footer from "../components/landingPage/footer.jsx";

class Landing extends Component {

  render() {
    return (
      <div className="landingGrid">
        <div className="header"><Header /></div>
        <div className="welcome">
          <div className="welcomeElements">
            <p>Revise aims to help creators to <br/>streamline their communication with clients.</p>
            <Link className="getStarted" to="/signup">Get Started</Link>
          </div>
        </div>
        <div className="footer"><Footer /></div>
      </div>
    );
  }
}

export default Landing;
