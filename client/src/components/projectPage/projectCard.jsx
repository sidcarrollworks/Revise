import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import '../../styles/projectCard.css';

class ProjectCard extends Component {
  render() {
    return (
      <div className="projectCard">
        <div className="title">
            <h1>Title</h1>
        </div>
        <div className="description">
          <p>Hey there Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repudiandae illo delectus voluptates exercitationem officiis, dolorem illum. Impedit quo, ut nam ducimus voluptates totam quibusdam repellat voluptate numquam ab ipsam officia molestiae autem natus laudantium molestias! Quae laudantium illo repudiandae.</p>
        </div>
        <div className="buttons">
          <button>archive project</button>
          <button onClick={() => this.simpleDialog.show()}>Member settings</button>
          <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Members">
            <div>
              Joe
              Frank
              Susan
              Bill
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