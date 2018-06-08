import React, { Component } from 'react';
import UserAvatar from 'react-user-avatar';

import '../../styles/revisionCard.css';

class RevComment extends Component {
  render() {
    // const { owner, text, createdAt } = this.props.cmnt
    console.log("lel", this.props)
    return (
      // <div className="revComments">
      //   <h4>{owner.username} - <span style={{color: "grey", fontSize:"1em", width: "100%", position: "absolute", left: 0}}>{new Date(createdAt).toString()}</span></h4>
      //   <p>{text}</p>
      // </div>

      <div className="revComments">
        <div className="commentUser"><UserAvatar size="50" src="https://www.biography.com/.image/t_share/MTE5NDg0MDU0ODUxNzE2NjIz/don-cheadle-538188-1-402.jpg" name="Don Cheadle" /></div>
        <h4 className="commentDate">2/4/1969 4:20pm PST</h4>
        <p className="commentText">Hey guys im don cheadle and im ready to be a star. Is this comment getting long at alll????</p>
      </div>
    )
  }
}

export default RevComment;
