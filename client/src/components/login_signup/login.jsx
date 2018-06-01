import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
    this.props.handleLogin(this.state.formData);
  }

  render() {
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
          <input name="username" type="text" placeholder="Username"/>
          <input name="password" type="password" placeholder="Password"/>
          <button id="formButton" type="submit">Login</button>
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
