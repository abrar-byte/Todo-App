import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Falcon from './Falcon';
import './index.css';
import Todos from './newTodo';
// import Map from './Map'
import reportWebVitals from './reportWebVitals';
// import Rapot from './Rapot';
import Todo from './Todos';


ReactDOM.render(
  <React.StrictMode>
    <Falcon />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();