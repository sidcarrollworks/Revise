import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import validator from 'validator';

import authClient from '../../utils/auth.js';
import '../../styles/login.css';
import IsLoading from '../isLoading.jsx';

import { Consumer as AuthConsumer } from '../../contexts/authContext.jsx';

class Signup extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "male"
      },
      firstNameErr: false,
      lastNameErr: false,
      usernameErr: false,
      emailErr: false,
      passwordErr: false,
      dateOfBirthErr: false,
      err: false
    }
    
    // bind functions with this
    this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  validateField(targetName) {
    const { isLength, isAlpha, isAlphanumeric, isEmail, isBefore } = validator;
    const { firstName, lastName, username, email, password, dateOfBirth } = this.state.formData;
    let status = null;
    let tmp = {};

    switch(targetName) {
      case 'firstName':
        status = isAlpha(firstName) && isLength(firstName, {min: 2, max: 31}) ? false : true;
        break;
      case 'lastName' || null:
        status = isAlpha(lastName) && isLength(lastName, {min: 2, max: 31}) ? false : true;
        break;
      case 'username':
        status = isAlphanumeric(username, 'en-US') ? false : true;
        break;
      case 'email':
        status = isEmail(email) ? false : true;
        break;
      case 'password':
        status = isLength(password, {min: 7, max: 32}) ? false : true;
        break;
      case 'dateOfBirth':
        status = isBefore(dateOfBirth) ? false : true;
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


  checkFormBeforeSending() {
    const { firstNameErr, lastNameErr, usernameErr, emailErr, passwordErr, dateOfBirthErr } = this.state;
    const { firstName, lastName, username, email, password, dateOfBirth } = this.state.formData;
    const { isEmpty } = validator;
    let tmp = {
      firstNameErr: isEmpty(firstName),
      lastNameErr: isEmpty(lastName),
      usernameErr: isEmpty(username),
      emailErr: isEmpty(email),
      passwordErr: isEmpty(password),
      dateOfBirthErr: isEmpty(dateOfBirth)
    };

    this.setState(tmp);
    
    if ((!firstNameErr && !lastNameErr && !usernameErr && !emailErr && !passwordErr && !dateOfBirthErr) &&
        (!Object.keys(tmp).every(k => tmp[k])))
      return true;
    else
      return false;
  }
  
  handleFormSubmit(e) {
    e.preventDefault();
    if(this.checkFormBeforeSending())
      authClient.signUp(this.state.formData).then(res => {
        if (res)
          this.props.history.push("/login");
        else
          this.setState({err: true});
      })
      .catch(err => {
        console.log("react signup: ", err);
        this.setState({err: true});
      })
    else
      this.validateField();
  }

  render() {
    const { firstName, lastName, username, email, password, dateOfBirth, gender } = this.state.formData;
    const { firstNameErr, lastNameErr, usernameErr, emailErr, passwordErr, dateOfBirthErr } = this.state;
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
        <form className="loginWrapper" onSubmit={this.handleFormSubmit} onChange={this.handleFormChanges}>
          {this.state.err ? <h5>Err with signup</h5> : null}
          <input className={firstNameErr ? "wrongInput" : ""} name="firstName" value={firstName} type="text" placeholder="First Name" />
          <input className={lastNameErr ? "wrongInput" : ""} name="lastName" value={lastName} type="text" placeholder="Last Name" />
          <input className={usernameErr ? "wrongInput" : ""} name="username" value={username} type="text" placeholder="Username"/>
          <input className={emailErr ? "wrongInput" : ""} name="email" value={email} type="text" placeholder="Email" />
          <input className={passwordErr ? "wrongInput" : ""} name="password" value={password} type="password" placeholder="Password, min: 7, max: 32"/>
          <input className={dateOfBirthErr ? "wrongInput" : ""} name="dateOfBirth" value={dateOfBirth} id="formDate" type="date" />
          <select name="gender" id="formSelect">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button id="formButton" type="submit">Sign Up</button>
          <p className="message">Already have an account? <Link to="/login">Login here</Link></p>
        </form>
        <div className="logo"><Link to="/">Revise</Link></div>
      </div>
    );
  }
}

export default props => (
  <AuthConsumer>
    {context => (<Signup 
      {...props}
      isAuth={context.state.isAuth}
      isLoading={context.state.isLoading}
    />)}
  </AuthConsumer>
);
