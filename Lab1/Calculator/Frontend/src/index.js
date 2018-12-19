import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import Calculator from './Components/Calculator';

ReactDOM.render(
    <Provider store={store}>
        <Calculator />
    </Provider>, document.getElementById('root'));
registerServiceWorker();