import * as ActionTypes from '../constants/constants';
import AuthReducer from './auth.reducer';
import ServiceFormReducer from './serviceform.reducer';
import DashboardReducer from './dashboard.reducer';
import AdminReducer from './admin/reducer.js';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


export default combineReducers({
    serviceform: ServiceFormReducer,
    auth: AuthReducer,
    dashboard: DashboardReducer,
    routing: routerReducer,
    admin: AdminReducer
});

