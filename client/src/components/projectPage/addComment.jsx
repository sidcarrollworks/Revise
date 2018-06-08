import React, { Component } from 'react';
import SkyLight from 'react-skylight';

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

    var commentBox = {
      backgroundColor: 'white',
      minHeight: '100px'
    };

    return (
      <div>
        <button className="createCommentBtn" onClick={() => this.customDialog.show()}>Comment</button>
        <SkyLight dialogStyles={commentBox} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Create a new comment">
          <form className='commentFrom'>
            <textarea name="text" rows="3" cols="30" placeholder="Comment"></textarea>
            <button type="submit">Comment</button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
