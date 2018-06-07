import React, { Component } from 'react';

import '../../styles/revisionCard.css';

class RevComment extends Component {
  render() {
    const { owner, text, createdAt } = this.props.cmnt
    console.log("lel", this.props)
    return (
      <div className="revComments">
        <h4>{owner.username} - <span style={{color: "grey", fontSize:"1em", width: "100%", position: "absolute", left: 0}}>{new Date(createdAt).toString()}</span></h4>
        <p>{text}</p>
      </div>
    )
  }
}

export default RevComment;