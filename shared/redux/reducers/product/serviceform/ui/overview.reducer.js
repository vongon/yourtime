import * as ActionTypes from '../../../../constants/constants';



const SelectDateReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_OVERVIEW_SET_WORKPLACE_NAME:
            return {
                ...state,
                workplace_name: action.workplace_name
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_VEHICLE_NAME:
            return {
                ...state,
                vehicle_name: action.vehicle_name
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_SERVICES_OBJECTS:
            return {
                ...state,
                services_objects: action.services_objects
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_DATE:
            return {
                ...state,
                date: action.date
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_DISCOUNT_CODE:
            return {
                ...state,
                discount_code: action.discount_code
            };
        default:
            return state;
    }
};

export default SelectDateReducer;