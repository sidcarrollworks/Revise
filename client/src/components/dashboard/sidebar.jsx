import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';
// import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="">
        <div className="userInfo">
          <UserAvatar size="200" src="https://www.biography.com/.image/t_share/MTE5NDg0MDU0ODUxNzE2NjIz/don-cheadle-538188-1-402.jpg" name={this.props.user.firstName} />
          <h2>{this.props.user.firstName}</h2>
          <h4>{this.props.user.lastName}</h4>
          <p>@{this.props.user.username}</p>
        </div>
        <button id="dashLogout" onClick={this.props.handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Sidebar;
