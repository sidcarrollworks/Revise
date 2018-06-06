import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import '../../styles/projectCard.css';

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
          { isArchived ? <h4> this project is archived </h4> : <button>archive project</button>}
          <button onClick={() => this.simpleDialog.show()}>Member settings</button>
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Members">
            <div>
              { members.map(el => <span>{el.username}</span>) }
            </div>
            <button>invite</button>
            <button>uninvite</button>
          </SkyLight>
        </div>
      </div>
    )
  }
}

export default ProjectCard;
