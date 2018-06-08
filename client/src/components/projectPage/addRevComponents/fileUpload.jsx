import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import '../../../styles/fileUpload.css';

class FileUpload extends Component {

  constructor() {
    super();
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  removeFile(e) {

  }

  render() {
    return (
      <div className="fileUpload">
        <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
          <div>
            Drop File Here
          </div>
        </Dropzone>
        <div className="droppedFiles">
          { this.state.files.map(f => <p onCLick="" key={f.name}>{f.name} - {f.size} bytes</p>) }
        </div>
      </div>
    )
  }
}

export default FileUpload;