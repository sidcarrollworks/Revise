import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';


import '../../styles/login.css';
import IsLoading from '../isLoading.jsx';

import { Consumer as AuthConsumer } from '../../contexts/authContext.jsx';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      },
      usernameErr: false,
      passwordErr: false
    }
    // binding functions
    this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  checkFormBeforeSending() {
    const { usernameErr, passwordErr } = this.state;
    const { username, password } = this.state.formData;
    const { isEmpty } = validator;
    let tmp = {
      usernameErr: isEmpty(username),
      passwordErr: isEmpty(password)
    };

    this.setState(tmp);
    
    if ((!usernameErr && !passwordErr) &&
        (!Object.keys(tmp).every(k => tmp[k])))
      return true;
    else
      return false;
  }


  validateField(targetName) {
    const { isLength, isAlphanumeric } = validator;
    const { username, password } = this.state.formData;
    let status = null;
    let tmp = {};

    switch(targetName) {
      case 'username':
        status = isAlphanumeric(username, 'en-US') ? false : true;
        break;
      case 'password':
        status = isLength(password, {min: 7, max: 32}) ? false : true;
        break;
      default:
        return false;
    }
    tmp[targetName + 'Err'] = status;
    this.setState(tmp);
  }

  handleFormChanges(e) {
    e.preventDefault();
    let newData = this.state.formData;
    newData[e.target.name] = e.target.value;
    this.setState({
      formData: newData
    });
    this.validateField(e.target.name);
  }
  
  handleFormSubmit(e) {
    // returns false if fail else returns user
    e.preventDefault();
    if(this.checkFormBeforeSending())
      this.props.handleLogin(this.state.formData);
    else
      this.validateField();
  }


  render() {
    const { usernameErr, passwordErr } = this.state;

    return (
      this.props.isLoading
      ?
      <IsLoading />
      :
      this.props.isAuth
      ?
      <Redirect to="/dashboard"/>
      :
      <div className="componentWrapper">
        <form className="loginWrapper" onChange={this.handleFormChanges} onSubmit={this.handleFormSubmit}>
          {this.props.err ? <h5>Err with login</h5> : null}
          <input className={usernameErr ? "wrongInput" : ""} name="username" type="text" placeholder="Username"/>
          <input className={passwordErr ? "wrongInput" : ""} name="password" type="password" placeholder="Password"/>
          <button className="formButton" type="submit">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>
        <div className="logo"><Link to="/">Revise</Link></div>
      </div>
    );
  }
}

export default props => (
  <AuthConsumer>
    {context => (<Login 
      {...props}
      isAuth={context.state.isAuth}
      handleLogin={context.handleLogin}
      err={context.state.err}
      isLoading={context.state.isLoading}
    />)}
  </AuthConsumer>
);
