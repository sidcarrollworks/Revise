import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

class Login extends Component {
  render() {
    return (
      <div className="componentWrapper">
        <form className="loginWrapper">
            <input name="username" type="text" placeholder="Username"/>
            <input name="" type="text" placeholder="Password"/>
            <button id="formButton" type="submit">Login</button>
            <p class="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
