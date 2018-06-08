import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import TextareaAutosize from 'react-autosize-textarea';

import apiClient from '../../utils/api.js';

class AddRev extends Component {

  constructor(props) {
    super(props);

    this.state = {
      commentForm: {
        title: "",
        body: ""
      }
    }
  }


  render() {

    let commentBox = {
      backgroundColor: 'white',
      minHeight: '100px'
    };

    let inputBox = {
      width: '100%',
      resize: 'none',
      borderTopLeftRadius: '3px',
      borderBottomLeftRadius: '3px',
      gridArea: 'box',
      border: '1px solid rgba(7, 170, 234, 1)',
      padding: '10px',
      fontSize: '20px'
    }

    return (
      <div>
        <button className="createCommentBtn" onClick={() => this.customDialog.show()}>Comment</button>
        <SkyLight dialogStyles={commentBox} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Create a new comment">
          <form className='commentForm'>
            <TextareaAutosize style={inputBox} />
            <div className="btnContainer"><button type="submit">Comment</button></div>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
