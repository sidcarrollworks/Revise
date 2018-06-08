import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../../../styles/fileUpload.css';

class FileUpload extends Component {


  formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

  render() {
    return (
      <div className="fileUpload">
        <Dropzone className="dropzone" onDrop={this.props.onDrop}>
          <div>
            Drop File Here
          </div>
        </Dropzone>
        <div className="droppedFiles">
          { this.props.files.map(f => <p key={f.name}>{f.name} - {this.formatBytes(f.size, "MB")}</p>) }
        </div>
      </div>
    )
  }
}

export default FileUpload;
