import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import UserAvatar from 'react-user-avatar';

import '../../styles/projectCard.css';

import apiClient from '../../utils/api.js';

class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invitee: "",
      err: false
    } 

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleMembRemove = this.handleMembRemove.bind(this);
    this.handleMembInvite = this.handleMembInvite.bind(this);
  }

  handleFormChange(e) {
    e.preventDefault();
    // this.setState({ e.target.name })
    let tmp = {};
    tmp[e.target.name] = e.target.value;
    this.setState(tmp);
  }

  // this.props.refresh();
  handleMembRemove(e) {
    e.preventDefault();
    const { pid, refresh } = this.props;
    console.log(e.target.name)
    apiClient.removeMember(pid, { unInvitee: e.target.name })
      .then(res =>{
        console.log(res);
        refresh();
      })
      .catch(err => {
        console.log("remove member: ", err);
        this.setState({err: true});
      })
  }

  handleMembInvite(e) {
    e.preventDefault();
    const { pid, refresh } = this.props;

    apiClient.inviteMember(pid, { invitee: this.state.invitee })
      .then(res =>{
        console.log(res);
        refresh();
      })
      .catch(err => {
        console.log("invite member: ", err);
        this.setState({err: true});
      })
  }

  render() {
    const { members } = this.props;
    return (
      <>
        <button id="projMemberBtn" onClick={() => this.simpleDialog.show()}>MEMBERS</button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Add or remove members">
          <div className="memberSettings">
            <form onSubmit={this.handleMembInvite} onChange={this.handleFormChange} className="searchMembers">
              <input name="invitee" type="text"/>
              <button type="submit">Add </button>
            </form>
            <div id="memberList">
              { members.map(el => 
                <span key={el._id} className="member">
                  <UserAvatar size="40" src={el.avatarUrl ? el.avatarUrl : el.defaultAvatar} name={el.username} />
                  {el.username}
                  <button onClick={this.handleMembRemove} name={el.username} id="removeBtn">remove</button>
                </span>
              )}
            </div>
            { this.state.err ? <h4> there was an error posting removing/adding member </h4> : null }
          </div>
        </SkyLight>
      </>
    )
  }
}

export default Members;
