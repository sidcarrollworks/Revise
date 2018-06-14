import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ScrollableAnchor from 'react-scrollable-anchor'
import ScrollToTop from 'react-scroll-up';
import UserAvatar from 'react-user-avatar';

import '../styles/projectPage.css';

import ProjectCard from '../components/projectPage/projectCard.jsx';
import RevisionCard from '../components/projectPage/revisionCard.jsx';
import AddRevision from '../components/projectPage/addRevision.jsx';
import DashNav from '../components/navbar/dashNav.jsx';
import IsLoading from '../components/isLoading.jsx';

import { Consumer as SocketConsumer } from '../contexts/socketContext.jsx';

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
    this.props.joinProjRoom(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.leaveProjRoom(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    const { _id, isProjLoading } = this.state;
    
    if (_id === null && isProjLoading === false)
      this.fetchData();
    // if (!this.props.revs)
    //   this.props.joinProjRoom(this.props.match.params.id);
  }

  render() {
    // console.log(this.props.match.params.id)

    const { title, description, members, isArchived, revisions, isProjLoading, err } = this.state;
    const { id } = this.props.match.params;
    
    let revSwitch = revisions;
    if (this.props.revs)
      revSwitch = this.props.revs;
    
    if (isProjLoading)
      return <IsLoading />
    else if (!this.state.isAuthed && !this.state.isProjLoading)
      return <Redirect to="/dashboard" />
    else if (err)
      return (
        <div className="projectContainer">
          <div className="projectNav">
            <DashNav />
          </div>
            <div className="projectMain">
              <h4> there has been an error </h4>
            </div>
        </div>
      );
    else
      return (
        <div className="projectContainer">
          <ScrollToTop showUnder={160}>
            <UserAvatar size="40" src="/don/3.jpeg" name="dc" />
          </ScrollToTop>
          <div className="projectNav">
            <DashNav />
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
              
              {revSwitch.length !== 0 ? revSwitch.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(el => 
              <ScrollableAnchor key={el._id} id={el._id}>
                <RevisionCard key={el._id} isArchived={isArchived} rev={el} refresh={this.fetchData} pid={id} />
              </ScrollableAnchor>
              ) : <h4>Add your first Revision!!! u big dumbo</h4>}
            </div>
        </div>
      );
  }
}


export default props => (
  <SocketConsumer>
    {context => (<ProjectPage
      {...props}
      socket={context.socket}
      revs={context.revs}
      joinProjRoom={context.joinProjRoom}
      leaveProjRoom={context.leaveProjRoom}
    />)}
  </SocketConsumer>
);

