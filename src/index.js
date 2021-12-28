import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Map from './Map'
import reportWebVitals from './reportWebVitals';
// import App from './App';
// import Page from './1-Modal/Page';
// import StateHook from './Latihan/StateHook';
// import Effect from './Latihan/useEffect';
// import Templating from './Templating/Templating';
// import Routing from './Templating/Routing';
import Latihan2 from './React Hook Form/Latihan2';
import App from './React Hook Form/App';
import Upload from './React Hook Form/Upload';
import Control from './React Hook Form/Control';
import Form from './React Hook Form/Form';

ReactDOM.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();