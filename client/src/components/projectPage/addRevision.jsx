import React, { Component } from 'react';
import validator from 'validator';

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
      files: [],
      err: false,
      revToggle: false
    }

    
    // this.validateRev = this.validateRev.bind(this);
    // this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleRev = this.toggleRev.bind(this);
  }

  toggleRev(e) {
    e.preventDefault();
    this.setState({revToggle: !this.state.revToggle});
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
    const { title, body, text, files } = this.state;
    const { refresh, pid } = this.props;
    let revForm = {
      title: title,
      isFile: text ? false : true
    }
    if (text)
      revForm.body = body;
    else
      [revForm.filename, revForm.filesize] = [files[0].name, files[0].size];
    
    console.log(revForm)
    apiClient.createRev(pid, revForm)
      .then(res =>{
        if (!text){
          
          apiClient.uploadFile(pid, res, files[0])
            .then(res => {
              console.log(res);
              refresh();
            })

        } else {
          console.log(res)
          refresh();
        }
        refresh();
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
  
  onDrop(files) {
    this.setState({
      files
    });
    console.log(files)
  }

  formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}


  render() {
    return (
      <div className="addRev">
        {
          this.state.revToggle
          ?  
          <div className="addRevBox">
            <form onSubmit={this.handleFormSubmit} onChange={this.handleFormChange} className="revForm">
              <input id="createRevTitle" name="title" type="text" placeholder="Revision Title"/>
              <div className="uploadFileBtn"><button onClick={this.handleClick}>{ this.state.text ? "TEXT" : "FILE"}</button></div>
              {this.state.text ? <Text /> : <FileUpload files={this.state.files} onDrop={this.onDrop} />}
              <div className="createRevBtnArea"><button id="cancelRev" onClick={this.toggleRev}>Cancel</button><button id="createRevBtn" type="submit">Make Revision</button></div>
              { this.state.err ? <h4> there was an error posting Revision </h4> : null }
            </form>
          </div>
          :
          <button id="addRevBtn" onClick={this.toggleRev}>Add revision</button>
        }
      </div>
    );
  }
}

export default AddRev;
