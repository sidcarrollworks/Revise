import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/projectPage.css';

import ProjectCard from '../components/projectPage/projectCard.jsx';
import RevisionCard from '../components/projectPage/revisionCard.jsx';
import AddRevision from '../components/projectPage/addRevision.jsx';
import DashNav from '../components/navbar/dashNav.jsx';
import IsLoading from '../components/isLoading.jsx';

import { Consumer as AuthConsumer } from '../contexts/authContext.jsx';

import apiClient from '../utils/api.js';


class ProjectPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      members: [],
      invited: [],
      isArchived: null,
      _id: "",
      title: "",
      description: "",
      owner: {},
      revisions: [],
      createdAt: "",
      isProjLoading: true,
      err: false,
      isAuthed: false
    }

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    apiClient.getProjInfo(this.props.match.params.id)
      .then(info => {
        info.revisions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.setState({isProjLoading: false, isAuthed: true, ...info});
      })
      .catch(err => {
        console.log("proj page info: ", err);
        this.setState({err: true, isProjLoading: false});
      })
    this.setState({isProjLoading: true});
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { projInfo, isProjLoading } = this.state;
  
    if (projInfo === null && isProjLoading === false)
      this.fetchData();
  }

  render() {
    // console.log(this.props.match.params.id)
    const { title, description, members, isArchived, revisions, isProjLoading, err } = this.state;
    const { id } = this.props.match.params;
    if (isProjLoading || this.props.isLoading)
      return <IsLoading />
    else if ((!this.props.isAuth) || (!this.state.isAuthed && !this.state.isProjLoading))
      return <Redirect to="/dashboard" />
    else if (err)
      return (
        <div className="projectContainer">
          <div className="projectNav">
            <DashNav handleLogout={this.props.handleLogout} user={this.props.user} />
          </div>
            <div className="projectMain">
              <h4> there has been an error </h4>
            </div>
        </div>
      );
    else
      return (
        <div className="projectContainer">
          <div className="projectNav">
            <DashNav handleLogout={this.props.handleLogout} user={this.props.user} />
          </div>
            <div className="projectMain">
              <ProjectCard
                title={title}
                description={description}
                members={members}
                isArchived={isArchived}
                refresh={this.fetchData}
                pid={id}
              />
              {isArchived ? <h4> this project is archived </h4> : <AddRevision refresh={this.fetchData} pid={id} />}
              
              {revisions.map(el => <RevisionCard key={el._id} isArchived={isArchived} rev={el} refresh={this.fetchData} pid={id} />)}
            </div>
        </div>
      );
  }
}

// plan of attack
// make init call to api to preload page, meanwhile loading
// then map over revisions and pass relevent props
// then map over revision comments inside of revision cards
// then do a barrel roll

export default props => (
  <AuthConsumer>
    {context => (<ProjectPage
      {...props}
      user={context.state.user}
      isAuth={context.state.isAuth}
      handleLogout={context.handleLogout}
      isLoading={context.state.isLoading}
    />)}
  </AuthConsumer>
);
// export default ProjectPage;
