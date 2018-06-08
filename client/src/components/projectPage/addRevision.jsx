import React, { Component } from 'react';
import SkyLight from 'react-skylight';

import '../../styles/addRevision.css';

import Text from './addRevComponents/text.jsx';
import FileUpload from './addRevComponents/fileUpload.jsx';

import apiClient from '../../utils/api.js';

class AddRev extends Component {

  constructor(props) {
    super(props);

    this.state = {
      revisionForm: {
        title: "",
        body: ""
      },
      text: true
    }

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(e) {
    e.preventDefault();
		this.setState({text: !this.state.text});
	}


  render() {
    return (
      <div className="addRev">
        <button id="addRevBtn" onClick={() => this.simpleDialog.show()}>Add revision</button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Make a Revision">
          <form className="revForm">
            <input id="createRevTitle"name="title" type="text" placeholder="Revision Title"/>
            <div className="uploadFileBtn"><button onClick={this.handleClick}>{ this.state.text ? "TEXT" : "FILE"}</button></div>
            {this.state.text ? <Text /> : <FileUpload />}
            <div className="createRevBtnArea"><button id="createRevBtn" type="submit">Make Revision</button></div>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
