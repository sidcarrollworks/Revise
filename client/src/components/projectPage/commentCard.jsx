import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';

import '../../styles/revisionCard.css';

class RevComment extends Component {
  render() {
    const { owner, text, createdAt } = this.props.cmnt;
    return (
      <div className="revComments">
      <UserAvatar size="40" src={owner.avatarUrl ? owner.avatarUrl : `/don/${Math.floor(Math.random() * 4)}.jpeg`} name="Don Cheadle" />
        <h4>{owner.username} - <span style={{color: "grey", fontSize:"12px"}}>{new Date(createdAt).toString()}</span></h4>
        <p>{text}</p>
      </div>
    )
  }
}

export default RevComment;
