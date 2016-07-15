import AuthReducer from './auth.reducer';
import ProductReducer from './product/product.reducer';
import DashboardReducer from './dashboard.reducer';
import AdminReducer from './admin/reducer.js';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


export default combineReducers({
    product: ProductReducer,
    auth: AuthReducer,
    dashboard: DashboardReducer,
    routing: routerReducer,
    admin: AdminReducer
});

