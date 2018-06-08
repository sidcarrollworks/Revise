import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import validator from 'validator';

import '../../styles/addRevision.css';

import Text from './addRevComponents/text.jsx';
import FileUpload from './addRevComponents/fileUpload.jsx';

import apiClient from '../../utils/api.js';

class AddRev extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      text: true,
      err: false
    }

    
    // this.validateRev = this.validateRev.bind(this);
    // this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(e) {
    e.preventDefault();
    // this.setState({ e.target.name })
    let tmp = {};
    tmp[e.target.name] = e.target.value;
    this.setState(tmp);
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const { title, body, text } = this.state;
    let revForm = {
      title: title,
      isFile: text ? false : true
    }
    if (text)
      revForm.body = body;

    apiClient.createRev(this.props.pid, revForm)
      .then(res =>{
        console.log(res)
        this.props.refresh();
      })
      .catch(err => {
        console.log("create revision: ", err);
        this.setState({err: true});
      })
  }


  handleClick(e) {
    e.preventDefault();
		this.setState({text: !this.state.text});
	}


  render() {
    return (
      <div className="addRev">
        <button id="addRevBtn" onClick={() => this.simpleDialog.show()}>Add revision</button>
        <SkyLight ref={ref => this.simpleDialog = ref} title="Make a Revision">
          <form onSubmit={this.handleFormSubmit} onChange={this.handleFormChange} className="revForm">
            <input id="createRevTitle" name="title" type="text" placeholder="Revision Title"/>
            <div className="uploadFileBtn"><button onClick={this.handleClick}>{ this.state.text ? "TEXT" : "FILE"}</button></div>
            {this.state.text ? <Text /> : <FileUpload />}
            <div className="createRevBtnArea"><button id="createRevBtn" type="submit">Make Revision</button></div>
            { this.state.err ? <h4> there was an error posting Revision </h4> : null }
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
