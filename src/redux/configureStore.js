import {
    createStore,
    applyMiddleware
} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducer';

export const history = createBrowserHistory();

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(history)));

export default function configStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    if (module.hot) {
        module.hot.accept('./reducer', () =>
            store.replaceReducer(require('./reducer').default)
        );
    }
    return store;
}