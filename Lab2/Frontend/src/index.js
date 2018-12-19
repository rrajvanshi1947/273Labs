import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css'

// import TravelerLogin from './components/TravelerLogin'
import Profile from './components/Profile'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import store from './redux/store'
// import App from "./App";


ReactDOM.render(<Provider store= {store}>
<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();


