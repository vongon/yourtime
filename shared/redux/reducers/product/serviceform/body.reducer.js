import * as ActionTypes from '../../../constants/constants';

const initialBodyState = {services: ['']};

const ServiceFormBodyReducer =  (state = initialBodyState, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_FORM_WORKPLACE_SET_WORKPLACE:
            return {
                ...state,
                workplace_id: action.workplace_id
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_VEHICLE:
            return {
                ...state,
                vehicle_id: action.vehicle_id
            };
        case ActionTypes.PRODUCT_FORM_SERVICE_SET_SERVICES:
            return {
                ...state,
                services: action.services
            };
        case ActionTypes.PRODUCT_FORM_DATE_SET_DATE:
            return {
                ...state,
                date: action.date
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_STRIPE_CUSTOMER_ID:
            return {
                ...state,
                customer_id: action.customer_id
            };
        case ActionTypes.PRODUCT_OVERVIEW_SET_TOTAL_PRICE:
            return {
                ...state,
                total_price: action.total_price
            };
        default:
            return state;
    }
}

export default ServiceFormBodyReducer;