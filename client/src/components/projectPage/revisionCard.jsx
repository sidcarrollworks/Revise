import React, { Component } from 'react'
import SkyLight from 'react-skylight';
import '../../styles/revisionCard.css';

import RevComment from './revComment.jsx';

class ProjectCard extends Component {
  render() {
    return (
        <div>
            <div className="revisionCard">
                <div className="revTitle">
                    <h1>Title</h1>
                </div>
                <div className="revId">#66666</div>
                <div className="revText">
                    <p>lkasd lfnweo lsdnf lsfnowie sdn lasnd iwef nsdn owen osddn Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime alias sit amet quidem quos! Debitis adipisci at quasi expedita eum earum placeat molestiae asperiores aliquid. Excepturi dolor assumenda dolorum maxime.</p>
                </div>
                <div className="revFile">
                    This file studff
                </div>
                <div className="gridComment">
                    <button onClick={() => this.simpleDialog.show()}>Comment</button>
                    <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Create a new project">
                        <form className='projectFrom'>
                            <textarea name="text" rows="3" cols="30" placeholder="Comment"></textarea>
                            <button type="submit">Comment</button>
                        </form>
                    </SkyLight>
                </div>
            </div>
            <div className="revComments">
                <h4>Billy Bob</h4>
                <p>Here is a comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam excepturi incidunt tempore atque corrupti adipisci placeat ullam maiores! Dolor, quam?</p>
            </div>
        </div>
    )
  }
}

export default ProjectCard;