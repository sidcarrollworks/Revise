import React, { Component } from 'react';

import authClient from '../utils/auth.js';
import apiClient from '../utils/api.js';

const { Provider, Consumer } = React.createContext();

class AuthProvider extends Component {

  constructor() {
    super();

    this.state = {
      isAuth: false,
      isLoading: false,
      user: null,
      err: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin(credentials) {
    authClient.logIn(credentials).then(res => {
      this.setState({ isAuth: true, user: res, isLoading: false, err: false });
      this.props.history.push('/dashboard');
    })
    .catch(err => {
      console.log("loginContext: ", err);
      this.setState({err: true, isLoading: false});
    })
    this.setState({ isLoading: true });
  }

  handleLogout() {
    this.setState({ isAuth: false, user: null });
    authClient.logOut();
    this.props.history.push('/');
  }

  componentWillMount() {
    if (!this.state.user && apiClient.fetchToken()) {
      apiClient.getCurrentUser().then(user => {
        this.setState({ isAuth: true, user: user, isLoading: false });
      })
      .catch(err => {
        console.log("getUserContext : ", err);
        this.setState({err: true, isLoading: false});
      })
      this.setState({ isLoading: true });
    }
  }

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}


export { AuthProvider, Consumer }
