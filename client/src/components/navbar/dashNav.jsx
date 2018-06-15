import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

export default class dashNav extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userToggle: false
    }
    

    this.toggleClass = this.toggleClass.bind(this);
  }

  toggleClass () {
    this.setState({userToggle: !this.state.userToggle})
  }

  render() {
    const { user, handleLogout } = this.props;
    return (
      <div className="dashNav">
        <Link to="/"><img id="dashLogo" src="/assets/SVG/dashboardIcon.svg"/></Link>
        <Link className="dashLink" to="/dashboard">Dashboard</Link>
        <div id="dashAvatar">
          <div onClick={this.toggleClass}><UserAvatar size="40" src="/don/2.jpeg" name={user.username} /></div>
          <ul className={this.state.userToggle ? "dropDownOn" : "dropDownOff"}>
            <h4 id="username">{user.username}</h4>
            <li className="dropDownElement">
            <p id="dashLogout" onClick={handleLogout}>Log out</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
