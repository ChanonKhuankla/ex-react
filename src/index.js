import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import 'sweetalert/dist/sweetalert.css';

import * as serviceWorker from './serviceWorker';
import App from './App';
import firebaseServices from "./services/FirebaseServices";
import './assets/styles.css';

firebaseServices.initializeApp();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
