import React, { Component } from 'react'
import UserAvatar from 'react-user-avatar';

import '../../styles/revisionCard.css';

import RevComment from './commentCard.jsx';
import AddComment from './addComment.jsx';
import FileCard from './fileCard.jsx';

class revisionCard extends Component {
  render() {
    const { title, body, isFile, _id, comments, owner, createdAt } = this.props.rev
    return (
      <>
        <div className="revisionCard">
          <div className="revTitle">
              <h2>{title} - <span className="revDate">{new Date(createdAt).toString()}</span></h2>
          </div>
          <div className="revUser">
              <UserAvatar size="60" src={owner.avatarUrl ? owner.avatarUrl : `/don/${Math.floor(Math.random() * 4)}.jpeg`} name="Don Cheadle" />
          </div>
          <div className="revBody">
              {isFile ? <FileCard /> : <p>{body}</p>}
          </div>
          <div className="revIdHolder"><span className="revId">{`#${_id}`}</span></div>
          <div className="gridComment">
              <AddComment refresh={this.props.refresh} rId={_id} pid={this.props.pid} />
          </div>
        </div>

        {comments.length ? comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(el => <RevComment key={el._id} cmnt={el} />) : null}
      </>
    )
  }
}

export default revisionCard;
