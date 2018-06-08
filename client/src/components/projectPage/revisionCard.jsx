import React, { Component } from 'react'
import SkyLight from 'react-skylight';
import '../../styles/revisionCard.css';

import RevComment from './revComment.jsx';
import AddComment from './addComment.jsx';

class ProjectCard extends Component {
  render() {
    const { title, body, _id, comments, owner, createdAt } = this.props.rev
    return (
        <div>
            <div className="revisionCard">
                <div className="revTitle">
                    <h1>{title} - <span style={{color: "grey", fontSize:"1em"}}>{new Date(createdAt).toString()}</span></h1>
                </div>
                <div className="revId">{`#${_id}`}</div>
                <div className="revText">
                    <p>{body}</p>
                </div>
                <div className="revFile">
                    {owner.username}
                </div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>
            {comments.length ? comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(el => <RevComment key={el._id} cmnt={el} />) : null}
        </div>
    )
  }
}

export default ProjectCard;
