import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import Sidebar from '../components/sidebar.jsx';
import Projectlist from '../components/projectList.jsx';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboardGrid">
        <div className="dashboardNav"> Nav holder</div>
        <div className="componentGrid">
          <div className="sidebar"><Sidebar /></div>
          <div className="projects"><Projectlist /></div>
        </div>
      </div>
    );
  }
}

export default Dashboard;