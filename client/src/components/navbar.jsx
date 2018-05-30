import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link id="home" to="/">Home</Link>
          <Link id="login" to="/login">Log In</Link>
          <Link id="signup" to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default Navbar;