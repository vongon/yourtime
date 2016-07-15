import * as ActionTypes  from '../../constants/constants'
import { combineReducers } from 'redux';
import ServiceFormReducer from './serviceform/serviceform.reducer';

const ProductReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_GLOBAL_SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
}


export default combineReducers({
    serviceform: ServiceFormReducer,
    global: ProductReducer
});