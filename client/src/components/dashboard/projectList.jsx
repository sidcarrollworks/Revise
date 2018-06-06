import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import SkyLight from 'react-skylight';
import '../../styles/projectList.css';


class Projectlist extends Component {
  render() {
    return (
      <div className="projectList">
        <h1>Projegcts</h1>
        <div className="newProject">
          <button onClick={() => this.simpleDialog.show()}>New Project</button>
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Create a new project">
            <form className='projectFrom'>
              <input name="title" type="text" placeholder="Project Title"/>
              <textarea name="text" rows="3" cols="30" placeholder="Project description and info..."></textarea>
              <button type="submit">Create Project</button>
            </form>
          </SkyLight>
        </div>
        <div className="projects">
          <div className="projectLink">Project something</div>
          <div className="projectLink">Project 2</div>
          <div className="projectLink">Project 3</div>
          <div className="projectLink">Project 4</div>
        </div>
      </div>
    );
  }
}

export default Projectlist;