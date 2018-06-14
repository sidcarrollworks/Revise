import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter as Router } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker.js';

ReactDOM.render(
    <Router><App /></Router>,
    document.getElementById('root')
);
// registerServiceWorker();
