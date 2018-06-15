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
      files: [],
      err: false
    }

    
    // this.validateRev = this.validateRev.bind(this);
    // this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.formatBytes = this.formatBytes.bind(this);
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
    
    if (text && revForm.body.length == 0)
      this.setState({err: true});
    else
      apiClient.createRev(pid, revForm)
        .then(res =>{
          if (!text){
            
            apiClient.uploadFile(pid, res, files[0])
              .then(res => {
                console.log(res);
                this.customDialog.hide()
                this.setState({err: false});
              })

          } else {
            console.log(res)
            this.customDialog.hide()
            this.setState({err: false});
          }
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
    // console.log(files)
  }

  formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}


  render() {
    return (
      <div className="addRev">
        <button id="addRevBtn" onClick={() => this.customDialog.show()}>Add revision</button>
        <SkyLight ref={ref => this.customDialog = ref} title="Make a Revision">
          <form onSubmit={this.handleFormSubmit} onChange={this.handleFormChange} className="revForm">
            <input id="createRevTitle" value={this.state.title} name="title" type="text" placeholder="Revision Title"/>
            <div className="uploadFileBtn"><button onClick={this.handleClick}>{ this.state.text ? "TEXT" : "FILE"}</button></div>
            {this.state.text ? <Text /> : <FileUpload files={this.state.files} onDrop={this.onDrop} />}
            <div className="createRevBtnArea"><button id="createRevBtn" type="submit">Make Revision</button></div>
            { this.state.err ? <h4> there was an error posting Revision </h4> : null }
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
