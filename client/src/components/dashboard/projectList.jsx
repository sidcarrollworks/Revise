import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/projectList.css';


class Projectlist extends Component {
  render() {
    const { ownedProj, memberProj, invitedProj } = this.props.projects;
    // console.log("plist PROPS", this.props)
    return (
      !this.props.projects
      ?
      <h3> Your projects could not be loaded </h3>
      :
      <div className="projects">
        <h4>My Projects</h4>
        { ownedProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h4>Active Projects</h4>
        { memberProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h4>Invited Projects</h4>
        { invitedProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h4>Archived Projects</h4>
        { [...ownedProj, ...memberProj, ...invitedProj].map(el => 
          el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <div className="projectLink">Project 4</div>
      </div>
    );
  }
}

export default Projectlist;
