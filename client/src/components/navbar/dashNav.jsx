import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import '../../styles/dashNav.css';

export default class dashNav extends Component {
  render() {
    return (
      <div className="dashNav">
        <Link to="/dashboard">Dashboard</Link>
      </div>
    )
  }
}
