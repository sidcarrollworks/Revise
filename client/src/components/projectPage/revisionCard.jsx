import React, { Component } from 'react'
import SkyLight from 'react-skylight';
import '../../styles/revisionCard.css';
import UserAvatar from 'react-user-avatar';

import RevComment from './revComment.jsx';
import AddComment from './addComment.jsx';

class ProjectCard extends Component {
  render() {
    // const { title, body, _id, comments, owner, createdAt } = this.props.rev;
    return (
        <div>
            {/* <div className="revisionCard">
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
            </div> */}

            <div className="revisionCard">
                <div className="revTitle">
                    <h2>Revision #1 - <span className="revDate">2/3/2018 4:10pm PST</span></h2>
                </div>
                <div className="revUser">
                    <UserAvatar size="50" src="https://www.biography.com/.image/t_share/MTE5NDg0MDU0ODUxNzE2NjIz/don-cheadle-538188-1-402.jpg" name="Don Cheadle" />
                </div>
                <div className="revBody">
                    <p>This is the revision woooohooooooooo</p>
                </div>
                <div className="revIdHolder"><span className="revId">#3o45uo34uo2i32o4u2oi829</span></div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>

            <div className="revisionCard">
                <div className="revTitle">
                    <h2>Revision #1 - <span className="revDate">2/3/2018 4:10pm PST</span></h2>
                </div>
                <div className="revUser">
                    <UserAvatar size="50" src="" name="Don Cheadle" />
                </div>
                <div className="revBody">
                    <p>This is the revision woooohooooooooo</p>
                </div>
                <div className="revIdHolder"><span className="revId">#3o45uo34uo2i32o4u2oi829</span></div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>

            <div className="revisionCard">
                <div className="revTitle">
                    <h2>Revision #1 - <span className="revDate">2/3/2018 4:10pm PST</span></h2>
                </div>
                <div className="revUser">
                    <UserAvatar size="50" src="" name="Big BOi" />
                </div>
                <div className="revBody">
                    <p>This is the revision woooohooooooooo</p>
                </div>
                <div className="revIdHolder"><span className="revId">#3o45uo34uo2i32o4u2oi829</span></div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>

            <div className="revisionCard">
                <div className="revTitle">
                    <h2>Revision #1 - <span className="revDate">2/3/2018 4:10pm PST</span></h2>
                </div>
                <div className="revUser">
                    <UserAvatar size="50" src="" name="Big BOi" />
                </div>
                <div className="revBody">
                    <p>This is the revision woooohooooooooo</p>
                </div>
                <div className="revIdHolder"><span className="revId">#3o45uo34uo2i32o4u2oi829</span></div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>

            <div className="revisionCard">
                <div className="revTitle">
                    <h2>Revision #1 - <span className="revDate">2/3/2018 4:10pm PST</span></h2>
                </div>
                <div className="revUser">
                    <UserAvatar size="50" src="" name="Big BOi" />
                </div>
                <div className="revBody">
                    <p>This is the revision woooohooooooooo</p>
                </div>
                <div className="revIdHolder"><span className="revId">#3o45uo34uo2i32o4u2oi829</span></div>
                <div className="gridComment">
                    <AddComment />
                </div>
            </div>

            {/* {comments.length ? comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(el => <RevComment key={el._id} cmnt={el} />) : null} */}
        </div>
    )
  }
}

export default ProjectCard;
