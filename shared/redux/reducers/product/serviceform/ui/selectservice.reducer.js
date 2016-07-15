import * as ActionTypes from '../../../../constants/constants';

const SelectServiceReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_FORM_SERVICE_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.PRODUCT_FORM_SERVICE_SET_AVAILABLE_SERVICES:
            return {
                ...state,
                availableServices: action.availableServices
            };
        default:
            return state;
    }
};

export default SelectServiceReducer;