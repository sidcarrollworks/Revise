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
            <p>Create and manage your projects with ease.</p>
            <Link className="getStarted" to="/signup">Get Started</Link>
          </div>

          {/* <div className="about">
            <h2>
              About
            </h2>
            <p>
              Revise is a project based management system made for designers and artists. It provides a clear and dedicated way to share changes to a project.
            </p>
          </div> */}
        </div>
        
        <div className="footer"><Footer /></div>
      </div>
    );
  }
}

export default Landing;
