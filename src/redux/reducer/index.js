import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { history } from '../configureStore';

import {
    Users,
    Layouts
} from '../actions';

export const reducers = {
    Users,
    Layouts
}
export default combineReducers({
    ...reducers,
    history: () => history || {},
    routing: routerReducer,
});