import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

class Login extends Component {
  render() {
    return (
      <div className="componentWrapper">
        <form className="loginWrapper">
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <button id="formButton" type="submit">Login</button>
            <p class="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;