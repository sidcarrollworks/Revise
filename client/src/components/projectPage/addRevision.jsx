import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import validator from 'validator';

import '../../styles/addRevision.css';

import apiClient from '../../utils/api.js';

class AddRev extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
    }
    
    // this.validateRev = this.validateRev.bind(this);
    // this.checkFormBeforeSending = this.checkFormBeforeSending.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormUpdate(e) {
    e.preventDefault();
    // this.setState({ e.target.name })

  }
  handleFormSubmit(e) {
    e.preventDefault();
    // create rev and then in cllback post pic if pic
      apiClient.createRev(this.state)
  }


  render() {
    return (
      <div className="addRev">
        <button id="addRevBtn" onClick={() => this.simpleDialog.show()}>Add revision</button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Make a Revision">
          <form onSubmit={this.handleRevForm} onChange={this.handleFromSubmit} className="revForm">
            <input id="createRevTitle"name="title" type="text" placeholder="Revision Title"/>
            <textarea id="createRevText" name="text"></textarea>
            <button id="createRevBtn" type="submit">Make Revision</button>
          </form>
        </SkyLight>
      </div>
    );
  }
}

export default AddRev;
