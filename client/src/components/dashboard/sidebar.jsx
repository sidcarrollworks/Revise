import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';
// import { Link } from 'react-router-dom';

class Sidebar extends Component { 
  render() {
    const { avatarUrl, firstName, lastName, username, handleLogout } = this.props.user;
    return (
      <div className="">
        <div className="userInfo">
          <div id="userAvatar"><UserAvatar size="200" src="/don/2.jpeg" name={username} /></div>
          <h4 id="first">{firstName}</h4>
          <h4 id="last">{lastName}</h4>
          <h4 id="user">{username}</h4>
        </div>
        <button id="dashLogout" onClick={this.props.handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Sidebar;
