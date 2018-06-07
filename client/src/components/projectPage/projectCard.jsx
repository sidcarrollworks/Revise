import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import '../../styles/projectCard.css';
const membersSLCss = {
  backgroundColor: 'green'
};

class ProjectCard extends Component {
  render() {
    const { title, description, members, isArchived} = this.props.projCard
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
          <button id="projMemberBtn" onClick={() => this.simpleDialog.show()}>MEMBERS</button>
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add or remove members">
            <div className="memberSettings">
              <form className="searchMembers">
                <input type="text"/>
                <button type="submit">Add </button>
              </form>
              <div id="memberList">
                { members.map(el => <span>{el.username}<button id="removeBtn">remove</button></span>) }
              </div>
            </div>
          </SkyLight>
        </div>
      </div>
    )
  }
}

export default ProjectCard;
