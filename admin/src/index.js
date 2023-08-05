import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import Store from "./store"
import {BrowserRouter} from "react-router-dom"
window.Store = Store

ReactDOM.render(
  <Provider store = {Store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)