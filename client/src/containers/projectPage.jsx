import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import '../styles/projectPage.css';

import ProjectCard from '../components/projectPage/projectCard.jsx';
import RevisionCard from '../components/projectPage/revisionCard.jsx';
import AddRevision from '../components/projectPage/addRevision.jsx';
import DashNav from '../components/navbar/dashNav.jsx';


class ProjectPage extends Component {
  render() {
    return (
      <div className="projectContainer">
        <div className="projectNav"><DashNav /></div>
          <div className="projectMain">
            <ProjectCard />
            <AddRevision />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
            <RevisionCard />
          </div>
      </div>
    );
  }
}

export default ProjectPage;