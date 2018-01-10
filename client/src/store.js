import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers/reducers';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer,
                 composeWithDevTools(applyMiddleware(promiseMiddleware(), thunkMiddleware, loggerMiddleware)));

export default store;
