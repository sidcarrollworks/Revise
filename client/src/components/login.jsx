import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authClient from '../utils/auth.js';
import '../styles/login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      }
    }
    // binding functions
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChanges(e) {
    e.preventDefault();
    let newData = this.state.formData;
    newData[e.target.name] = e.target.value;
    this.setState({
      formData: newData
    });
  }
  
  handleFormSubmit(e) {
    // returns false if fail else returns user
    e.preventDefault();
    authClient.logIn(this.state.formData).then(res => {
      console.log(res);
      console.log(localStorage.getItem('token'))
      this.props.history.push("/dashboard");
    })
  }


  render() {
    return (
      <div className="componentWrapper">
        <form className="loginWrapper" onChange={this.handleFormChanges} onSubmit={this.handleFormSubmit}>
            <input name="username" type="text" placeholder="Username"/>
            <input name="password" type="password" placeholder="Password"/>
            <button id="formButton" type="submit">Login</button>
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
