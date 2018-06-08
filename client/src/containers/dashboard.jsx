import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import '../styles/dashboard.css';

import Sidebar from '../components/dashboard/sidebar.jsx';
import Projectlist from '../components/dashboard/projectList.jsx';
import IsLoading from '../components/isLoading.jsx';
import DashNav from '../components/navbar/dashNav.jsx';

import { Consumer as AuthConsumer } from '../contexts/authContext.jsx';

import apiClient from '../utils/api.js';

// temp
import SkyLight from 'react-skylight';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      areProjLoading: false,
      dashboardInfo: null,
      projFormData: {
        title: "",
        description: ""
      },
      err: false,
      isAuth: null
    }
    

    this.fetchData = this.fetchData.bind(this);
    this.validateProjCreate = this.validateProjCreate.bind(this);
    this.handleProjUpdate = this.handleProjUpdate.bind(this);
    this.handleProjCreate = this.handleProjCreate.bind(this);
  }

  validateProjCreate() {

    const { title, description } = this.state.projFormData;

    if (title && description)
      return true;
    else
      return false;
  }

  handleProjUpdate(e) {
    e.preventDefault();
    let newData = this.state.projFormData;
    newData[e.target.name] = e.target.value;
    this.setState({
      projFormData: newData
    });
  }

  handleProjCreate(e) {
    e.preventDefault();
    if (this.validateProjCreate())
      apiClient.createProject(this.state.projFormData)
        .then(res => {
          if (res)
            this.props.history.push("/project/" + res);
          else
            throw new Error("err in proj creation");
        })
        .catch(err => {
          console.log('dashboard prj creation: ', err);
          this.setState({err: true});
        })
    else
      this.setState({err: true});
  }

  fetchData() {
    apiClient.getDashboardInfo()
      .then(info => {
        this.setState({areProjLoading: false, dashboardInfo: info})
      })
      .catch(err => {
        console.log("dashboard info: ", err);
        this.setState({err: true, areProjLoading: false});
      })
    this.setState({areProjLoading: true});
  }


  componentDidMount() {
    // console.log("wagadoudou")
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { dashboardInfo, areProjLoading } = this.state;
    // console.log("dididou")
    // console.log(prevProps, prevState);
    if (dashboardInfo === null && areProjLoading === false)
      this.fetchData();
  }

  render() {
    const { title, description } = this.state.projFormData;
    const { dashboardInfo } = this.state;

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

        <div className="sidebar">
          <Sidebar
            handleLogout={this.props.handleLogout}
            user={this.props.user}
          />
        </div>

        <div className="projectPanel">
          <div className="projectList">
            <h1>Projects</h1>

            {/* creating a new project skybox and logic */}
            <div className="newProject">
              <button id="newProjectBtn" onClick={() => this.simpleDialog.show()}>New Project</button>
              <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Create a new project">
                {this.state.err ? <h5>Err with proj creation</h5> : null}
                <form onChange={this.handleProjUpdate} onSubmit={this.handleProjCreate} className='projectForm'>
                  <input id="createProjectTitle" name="title" value={title} type="text" placeholder="Project Title"/>
                  <textarea id="createProjectDesc" name="description" value={description} placeholder="Project description and info..."></textarea>
                  <button id="createProjectBtn" type="submit">Create Project</button>
                </form>
              </SkyLight>
            </div>

            {/* Project list is generated here */}
            <Projectlist projects={dashboardInfo ? dashboardInfo : false} refresh={this.fetchData} />

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
