import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../styles/projectList.css';

class Projectlist extends Component {
  render() {
    return (
      <div className="projectList">
        <h1>Projects</h1>
        <div className="newProject"><button>New Project</button></div>
        <div className="projectContainer">
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