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
        <h2>My Projects</h2>
        { ownedProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h2>Active Projects</h2>
        { memberProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h2>Invited Projects</h2>
        { invitedProj.map(el => 
          !el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
        <h2>Archived Projects</h2>
        { [...ownedProj, ...memberProj, ...invitedProj].map(el => 
          el.isArchived ? 
          <Link key={el._id} to={'project/' + el._id}>
            <div className="projectLink">{el.title}</div>
          </Link> : null
        ) }
      </div>
    );
  }
}

export default Projectlist;
