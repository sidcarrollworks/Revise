import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ScrollableAnchor from 'react-scrollable-anchor'
import ScrollToTop from 'react-scroll-up';
import UserAvatar from 'react-user-avatar';
import io from 'socket.io-client';

import '../styles/projectPage.css';

import ProjectCard from '../components/projectPage/projectCard.jsx';
import RevisionCard from '../components/projectPage/revisionCard.jsx';
import AddRevision from '../components/projectPage/addRevision.jsx';
import DashNav from '../components/navbar/dashNav.jsx';
import IsLoading from '../components/isLoading.jsx';

// on the bench for now
// import { Consumer as SocketConsumer } from '../contexts/socketContext.jsx';
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
      isAuthed: false,
      socket: io('/', {
        query: {token: apiClient.fetchToken()},
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax : 5000,
        reconnectionAttempts: Infinity
      })
    }

    this.state.socket.on('pUpdate', data => {
      console.log("socket io: ", data)
      this.setState({
        revisions: data
      })
    })

    this.fetchData = this.fetchData.bind(this);
    this.leaveProjRoom = this.leaveProjRoom.bind(this);
    this.joinProjRoom = this.joinProjRoom.bind(this);
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
    this.joinProjRoom(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.leaveProjRoom(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    const { _id, isProjLoading } = this.state;
    
    if (_id === null && isProjLoading === false)
      this.fetchData();
    // if (!this.props.revs)
    //   this.props.joinProjRoom(this.props.match.params.id);
  }

  joinProjRoom(pid) {
    console.log("joined room")
    if (this.state.revisions)
      this.setState({
        revisions: null
      });
    this.state.socket.emit('join-project', pid);
  }

  leaveProjRoom(pid) {
    console.log("left room")
    this.state.socket.emit('leave-project', pid);
    this.setState({
      revisions: null
    });
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
          <ScrollToTop showUnder={160}>
            <span>TOP</span>
          </ScrollToTop>
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
              
              {revisions.length !== 0 ? revisions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(el => 
              <ScrollableAnchor key={el._id} id={el._id}>
                <RevisionCard key={el._id} isArchived={isArchived} rev={el} refresh={this.fetchData} pid={id} />
              </ScrollableAnchor>
              ) : <h4>Add your first Revision!!!</h4>}
            </div>
        </div>
      );
  }
}

// export default ProjectPage;

// on the bench for now
// export default props => (
//   <SocketConsumer>
//     {context => (<ProjectPage
//       {...props}
//       socket={context.socket}
//       revs={context.revs}
//       joinProjRoom={context.joinProjRoom}
//       leaveProjRoom={context.leaveProjRoom}
//     />)}
//   </SocketConsumer>
// );

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
