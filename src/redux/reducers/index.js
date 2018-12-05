import { combineReducers } from 'redux';
import { testReducer } from './test-reducer.js';

const integratedReducer = combineReducers({
    testReducer: testReducer,
});
export default integratedReducer;