import { createStore , applyMiddleware } from 'redux';
import reducer from './reducers';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const middle = applyMiddleware(loggerMiddleware, thunkMiddleware);

export default createStore(reducer, middle);
