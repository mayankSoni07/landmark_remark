import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store/store.js';

import './index.css';
import App from './App/App';
import Map from './Main/Map';

ReactDOM.render(<Provider store={store}>
    <Map />
</Provider>, document.getElementById('root'));