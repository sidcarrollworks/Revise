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
      <div className="projectCard">
        <div className="title">
            <h1>{title}</h1>
        </div>
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="buttons">
          { isArchived ? <h4> this project is archived </h4> : <button id="archiveProjBtn">ARCHIVE</button>}
          { isArchived ? null : <Members members={members} refresh={refresh} pid={pid} /> }
        </div>
      </div>
    )
  }
}

export default ProjectCard;
