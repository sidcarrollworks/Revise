import React, { Component } from 'react'
import UserAvatar from 'react-user-avatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import '../../styles/revisionCard.css';

import RevComment from './commentCard.jsx';
import AddComment from './addComment.jsx';
import FileCard from './fileCard.jsx';

class revisionCard extends Component {
  render() {
    const { title, body, isFile, _id, comments, owner, createdAt, filename, filesize } = this.props.rev
    const { isArchived, pid } = this.props
    return (
      <>
        <div className="revisionCard">
          <div className="revTitle">
              <h2>{title} - <span className="revDate">{new Date(createdAt).toString()}</span></h2>
          </div>
          <div className="revUser">
              <UserAvatar size="60" src={owner.avatarUrl ? owner.avatarUrl : owner.defaultAvatar} name="Don Cheadle" />
          </div>
          <div className="revBody">

            {isFile ?
            <>
              <FileCard rid={_id} pid={pid} filename={filename} filesize={filesize} />
              {/* <FileCard rid={_id} pid={pid} filename={filename} filesize={filesize} /> */}
            </>
            : 
            <p>
              {body.split(/(\s+)/).map( (el, idx) => {
                if (el.match(/^#[a-f\d]{24}$/g))
                  return <a key={idx} href={`${el}`}><span className="highlightedId">{el}</span></a>
                else
                  return el
              })}
            </p>
            }

          </div>
            <div className="revIdHolder">

              <CopyToClipboard text={`#${_id}`} >
                <span className="revId">{`#${_id}`}</span>
              </CopyToClipboard>

            </div>
          <div className="gridComment">
              {isArchived ? null : <AddComment refresh={this.props.refresh} rId={_id} pid={this.props.pid} />}
          </div>
        </div>

        {comments.length ? comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(el => <RevComment key={el._id} cmnt={el} />) : null}
      </>
    )
  }
}

export default revisionCard;
