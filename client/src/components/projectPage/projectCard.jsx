import React, { Component } from 'react';

import Members from './addMembers.jsx';

import Archive from './archive.jsx'; 

import '../../styles/projectCard.css';
const membersSLCss = {
  backgroundColor: 'green'
};

class ProjectCard extends Component {
  render() {
    const { title, description, members, isArchived, refresh, pid } = this.props
    return (
      <div className={`projectCard ${isArchived ? "isArchived" : ""}`}>
        <div className="title">
            <h1>{title}</h1>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="buttons">
          { isArchived ? null : <Archive pid={pid} refresh={refresh} /> }
          { isArchived ? null : <Members members={members} refresh={refresh} pid={pid} /> }
        </div>
      </div>
    )
  }
}

export default ProjectCard;
