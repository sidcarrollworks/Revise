import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <img src="#" alt="Avatar" />
        <p>First Name: {this.props.user.firstName}</p>
        <p>Last Name: {this.props.user.lastName}</p>
        <p>username fool: {this.props.user.username}</p>
        <p>Settings</p>
        <button id="formButton" onClick={this.props.handleLogout}>Log out fool</button>
      </div>
    );
  }
}

export default Sidebar;
