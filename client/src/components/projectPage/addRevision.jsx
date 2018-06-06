import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import '../../styles/addRevision.css';

class AddRev extends Component {

  render() {
    return (
      <div className="addRev">
        <button onClick={() => this.simpleDialog.show()}>Add revision</button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Make a Revision">
          <form className="revForm">
            <input name="title" type="text" placeholder="Revision Title"/>
            <textarea name="text" rows="3" cols="30"></textarea>
            <button type="submit">Make Revision</button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;