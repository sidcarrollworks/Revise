import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
            <Link id="navLeft" to="/">Home</Link>
            <div id="navRight">
                <Link to="/login">Log In</Link>
                <Link to="/signup"> Sign Up</Link>
            </div>
        </div>
      </div>
    );
  }
}

export default Navbar;