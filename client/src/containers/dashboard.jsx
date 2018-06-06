import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/dashboard.css';

import Sidebar from '../components/dashboard/sidebar.jsx';
import Projectlist from '../components/dashboard/projectList.jsx';
import IsLoading from '../components/isLoading.jsx';
import DashNav from '../components/navbar/dashNav.jsx';

import { Consumer as AuthConsumer } from '../contexts/authContext.jsx';

import apiClient from '../utils/api.js';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      areProjLoading: false,
      dashboardInfo: null,
      err: false
    }
  }

  componentWillMount() {
    apiClient.getDashboardInfo().then(info => {
      this.setState({areProjLoading: false, dashboardInfo: info})
    })
    .catch(err => {
      console.log("dashboard info: ", err);
      this.setState({err: true, areProjLoading: false});
    })
    this.setState({areProjLoading: true});
  }

  render() {
    return (
      this.props.isLoading
      ?
      <IsLoading />
      :
      !this.props.isAuth
      ?
      <Redirect to="/"/>
      :
      <div className="dashboardGrid">
        <div className="dashboardNav"> <DashNav /></div>
        <div className="componentGrid">
          <div className="sidebar">
            <Sidebar
              handleLogout={this.props.handleLogout}
              user={this.props.user}
            />
          </div>
          <div className="projects">
            <Projectlist projects={this.state.dashboardInfo} />
          </div>
        </div>
      </div>
    );
  }
}

export default props => (
  <AuthConsumer>
    {context => (<Dashboard
      {...props}
      isAuth={context.state.isAuth}
      user={context.state.user}
      handleLogout={context.handleLogout}
      isLoading={context.state.isLoading}
    />)}
  </AuthConsumer>
);
