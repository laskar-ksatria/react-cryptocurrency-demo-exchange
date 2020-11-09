import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);


