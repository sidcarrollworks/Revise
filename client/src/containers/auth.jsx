import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

class Auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      }
    }

  }

//   write the fooken validator querrys and stuff

  render() {
    return (
      {
          if (this.props.location.pathname == "/login")
            // render login form
          else if (this.props.location.pathname == "/signup")
            // render signup form
          else
            // redirect to home
      }
    );
  }
}

// add context to container
export default Auth;
