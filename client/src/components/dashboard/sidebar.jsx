import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';
// import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';

class Sidebar extends Component {
  render() {
    const { avatarUrl, firstName, lastName, username, handleLogout } = this.props.user;
    return (
      <div className="">
        <div className="userInfo">
          <UserAvatar size="200" src={avatarUrl ? avatarUrl : `/don/${Math.floor(Math.random() * 4)}.jpeg`} name={username} />
          <h2>{firstName}</h2>
          <h4>{lastName}</h4>
          <p>@{username}</p>
        </div>
        <button id="dashLogout" onClick={handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Sidebar;
