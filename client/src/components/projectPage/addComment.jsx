import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import apiClient from '../../utils/api.js';

class AddRev extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      err: false
    }


    this.handleFormChanges = this.handleFormChanges.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChanges(e) {
    e.preventDefault();
		let tmp = {};
    tmp[e.target.name] = e.target.value;
    this.setState(tmp);
	}
  
  handleFormSubmit(e) {
    e.preventDefault();
    const { text } = this.state;
    const { rId, refresh, pid } = this.props;
    let cmntForm = {
      text: text,
      revId: rId
    }

    apiClient.createCmnt(pid, cmntForm)
      .then(res =>{
        console.log("lolwut", res)
        refresh();
      })
      .catch(err => {
        console.log("create comment: ", err);
        this.setState({err: true});
      })
  }

  render() {

    const commentBox = {
      backgroundColor: 'white',
      minHeight: '100px'
    };

    return (
      <>
        <button className="createCommentBtn" onClick={() => this.customDialog.show()}>Comment</button>
        <SkyLight dialogStyles={commentBox} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Create a new comment">
          <form onChange={this.handleFormChanges} onSubmit={this.handleFormSubmit} className='commentForm'>
            <textarea name="text" className="inputBox" rows="3" cols="30" placeholder="Comment"></textarea>
            <div className="btnContainer"><button type="submit">Comment</button></div>
            { this.state.err ? <h4> there was an error posting Comment </h4> : null }
          </form>
        </SkyLight>
      </>
    );
  }
}

export default AddRev;
