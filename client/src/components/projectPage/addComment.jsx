import React, { Component } from 'react';

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
    if (text.length == 0)
      this.setState({err: true})
    else
      apiClient.createCmnt(pid, cmntForm)
        .then(res =>{
          console.log("lolwut", res)
          // refresh();
          this.setState({err: false, text: ""});
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
        <form onChange={this.handleFormChanges} onSubmit={this.handleFormSubmit} className='commentForm'>
          <textarea value={this.state.text} name="text" className="inputBox" rows="1" placeholder="Comment"></textarea>
          <button className="commentBtn" type="submit">Comment</button>
          { this.state.err ? <h4> there was an error posting Comment </h4> : null }
        </form>
      </>
    );
  }
}

export default AddRev;
