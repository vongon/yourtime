import * as ActionTypes from '../../../../constants/constants';



const SelectDateReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_FORM_DATE_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.PRODUCT_FORM_DATE_SET_AVAILABLE_DATES:
            return {
                ...state,
                availableDates: action.dates
            };
        default:
            return state;
    }
};

export default SelectDateReducer;