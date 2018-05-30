import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authClient from '../utils/auth.js';
import '../styles/login.css';

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
      }
    }
    
    // bind functions with this
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
    authClient.signUp(this.state.formData).then(res => {
      if (res)
        this.props.history.push("/login");
      else
        console.log("bad login info");
    });
  }

  render() {
    const { firstName, lastName, username, email, password, dateOfBirth, gender } = this.state.formData;
    return (
      <div className="componentWrapper">
        <form className="loginWrapper" onSubmit={this.handleFormSubmit} onChange={this.handleFormChanges}>
          <input name="firstName" value={firstName} type="text" placeholder="First Name" />
          <input name="lastName" value={lastName} type="text" placeholder="Last Name" />
          <input name="username" value={username} type="text" placeholder="Username"/>
          <input name="email" value={email} type="text" placeholder="Email" />
          <input name="password" value={password} type="password" placeholder="Password"/>
          <input name="dateOfBirth" value={dateOfBirth} id="formDate" type="date" />
          <select name="gender" id="formSelect">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <button id="formButton" type="submit">Sign Up</button>
          <p className="message">Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    );
  }
}

export default Signup;
