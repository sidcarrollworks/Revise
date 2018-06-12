import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from 'react-user-avatar';

import '../../styles/projectList.css';

import apiClient from '../../utils/api.js';

class Projectlist extends Component {

  constructor(props) {
    super(props);


    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

 handleYes(e) {
    e.preventDefault();
    const { refresh } = this.props;
    apiClient.acceptInvite(e.target.name)
      .then(res =>{
        console.log(res);
        refresh();
      })
      .catch(err => {
        console.log("Yes error: ", err);
        // this.setState({err: true});
      })

  }

  handleNo(e) {
    e.preventDefault();
    const { refresh } = this.props;
    apiClient.rejectInvite(e.target.name)
      .then(res =>{
        console.log(res);
        refresh();
      })
      .catch(err => {
        console.log("Yes error: ", err);
        // this.setState({err: true});
      })
  }

  render() {
    const { ownedProj, memberProj, invitedProj } = this.props.projects;
    // console.log("plist PROPS", this.props)
    return (
      !this.props.projects
      ?
      <h3> Your projects could not be loaded </h3>
      :
      <div className="projects">
        <h2>My Projects</h2>
        { ownedProj.map(el =>
          !el.isArchived ? 
          <Link key={el._id} to={'/project/' + el._id}>
            <div className="projectLink">
              {el.title}
              <UserAvatar size="20" src={`/don/${Math.floor(Math.random() * 12)}.jpeg`} name="Don Cheadle" />
              <UserAvatar size="20" src={`/don/${Math.floor(Math.random() * 12)}.jpeg`} name="Don Cheadle" />

              <UserAvatar size="20" src={`/don/${Math.floor(Math.random() * 12)}.jpeg`} name="Don Cheadle" />

            </div>
          </Link> : null
        ) }
        <h2>Active Projects</h2>
        { memberProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'/project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h2>Invited Projects</h2>
        { invitedProj.map(el => 
          !el.isArchived ? 
          <div key={el.id} className="invitedLink">
            <span>{el.title}</span>
            <div className="inviteBtns">
              <button onClick={this.handleYes} name={el._id} id="accept">Accept</button>
              <button onClick={this.handleNo} name={el._id} id="deny">Deny</button>
            </div>
          </div> : null
        ) }
        <h2>Archived Projects</h2>
        { [...ownedProj, ...memberProj, ...invitedProj].map(el => 
          el.isArchived ? 
          <Link key={el._id} to={'/project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
      </div>
    );
  }
}

export default Projectlist;
