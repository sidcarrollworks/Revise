import React, { Component } from 'react'
import SkyLight from 'react-skylight';

class Archive extends Component {
  render() {

    let archiveBox = {
        backgroundColor: 'white',
        minHeight: '100px'
      };

    return (
      <>
        <button id="archiveProjBtn" onClick={() => this.customDialog.show()}>ARCHIVE</button>
        <SkyLight dialogStyles={archiveBox} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Are you sure?">
          <div className="archiveBtns">
            <button id="no">No</button>
            <button id="yes">Yes</button>
          </div>
        </SkyLight>
      </>
    )
  }
}

export default Archive;