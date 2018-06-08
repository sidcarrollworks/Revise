import React, { Component } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import "../styles/isLoading.css";

class isLoading extends Component {
  render() {
    return (
      <div className='loading'>
        <ClimbingBoxLoader />
      </div>
    );
  }
}

export default isLoading;
