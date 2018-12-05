import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store/store.js';

import './index.css';
import App from './App/App';
import MapComponent from './Main/MapComponent';

ReactDOM.render(<Provider store={store}>
    <MapComponent />
</Provider>, document.getElementById('root'));