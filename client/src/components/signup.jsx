import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

class Signup extends Component {
  render() {
    return (
      <div className="componentWrapper">
        <form className="loginWrapper">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Username"/>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password"/>
          <input id="formDate" type="date" />
          <select id="formSelect" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div>
            <input id="formCheckbox" type="checkbox" name="artistPage" value="artist" />
            Artist Page
          </div>
          <button id="formButton" type="submit">Create</button>
          <p class="message">Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    );
  }
}

export default Signup;