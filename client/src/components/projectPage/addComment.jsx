import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import '../../styles/addRevision.css';

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
    return (
      <>
        <button onClick={() => this.simpleDialog.show()}>Comment</button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Create a new comment">
          <form className='projectFrom'>
            <textarea name="text" rows="3" cols="30" placeholder="Comment"></textarea>
            <button type="submit">Comment</button>
          </form>
        </SkyLight>
      </>
    );
  }
}

export default AddRev;
