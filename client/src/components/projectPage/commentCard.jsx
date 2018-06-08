import React, { Component } from 'react';

import '../../styles/revisionCard.css';

class RevComment extends Component {
  render() {
    const { owner, text, createdAt } = this.props.cmnt;
    return (
      <div className="revComments">
        <h4>{owner.username} - <span style={{color: "grey", fontSize:"12px"}}>{new Date(createdAt).toString()}</span></h4>
        <p>{text}</p>
      </div>
    )
  }
}

export default RevComment;
