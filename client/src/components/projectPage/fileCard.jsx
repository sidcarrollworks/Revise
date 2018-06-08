import React, { Component } from 'react'

import apiClient from '../../utils/api.js';

class FileCard extends Component {

  formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
  
  donwload(e) {
    e.preventDefault()
    const { pid, rid } = this.props
    
    apiClient.downloadFile(pid, rid)
      // .then(res => {
      //   console.log("nice");
      // })
      // .catch(err => {
      //   console.log("file download: ", err);
      // })
  }

  render() {
    return (
      <div className="fileCard">
        <button onClick={this.donwload.bind(this)}><img src='/assets/SVG/dlimg.svg' alt="dlimg"/></button>
        <p>{this.props.filename} - {this.formatBytes(this.props.filesize, "MB")}</p>
      </div>
    )
  }
}

export default FileCard;
