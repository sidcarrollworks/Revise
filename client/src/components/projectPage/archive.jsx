import React, { Component } from 'react'
import SkyLight from 'react-skylight';

import apiClient from '../../utils/api.js';

class Archive extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      err: false
    }

    // this.handleYes = this.handleYes.bind(this);
    // this.handleNo = this.handleNo.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  // handleYes(e) {
  //   e.preventDefault();
  //   const { refresh, pid } = this.props;
  //   apiClient.acceptInvite(pid)
  //     .then(res =>{
  //       console.log(res);
  //       refresh();
  //     })
  //     .catch(err => {
  //       console.log("Yes error: ", err);
  //       this.setState({err: true});
  //     })

  // }

  // handleNo(e) {
  //   e.preventDefault();
  //   const { refresh, pid } = this.props;
  //   apiClient.rejectInvite(pid)
  //     .then(res =>{
  //       console.log(res);
  //       refresh();
  //     })
  //     .catch(err => {
  //       console.log("Yes error: ", err);
  //       this.setState({err: true});
  //     })
  // }

  handleArchive(e) {
    e.preventDefault();
    const { refresh, pid } = this.props;
    apiClient.archiveProj(pid)
      .then(res =>{
        console.log(res);
        refresh();
      })
      .catch(err => {
        console.log("Yes error: ", err);
        this.setState({err: true});
      })
  }



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
            <button onClick={this.handleArchive} id="yes">Yes</button>
          </div>
          { this.state.err ? <h4> there was an error archiving </h4> : null }
        </SkyLight>
      </>
    )
  }
}

export default Archive;
