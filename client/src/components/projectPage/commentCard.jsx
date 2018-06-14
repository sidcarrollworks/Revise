import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';

class RevComment extends Component {
  render() {
    const { owner, text, createdAt } = this.props.cmnt;
    return (
      <div className="revComments">
        <div className="commentUser"><UserAvatar size="40" src={owner.avatarUrl ? owner.avatarUrl : `/don/${Math.floor(Math.random() * 7)}.jpeg`} name="Don Cheadle" /></div>
        <h4 className="commentDate">{owner.username} - <span style={{color: "grey", fontSize:"12px"}}>{new Date(createdAt).toString()}</span></h4>
        <p className="commentText">{text}</p>
      </div>
    )
  }
}

export default RevComment;
