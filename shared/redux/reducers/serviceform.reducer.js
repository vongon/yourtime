import * as ActionTypes from '../constants/constants';


var initialState = {
    stepName: 'chooseWorkplace'
};

const ServiceFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FORM_SET_STEP:
            return {
                ...state,
                stepName: action.stepName
            };
        case ActionTypes.FORM_SET_WORKPLACE:
            return {
                ...state,
                workplace: action.workplace
            };
        case ActionTypes.FORM_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.FORM_SET_AVAILABLE_SERVICES_AND_STEP:
            return {
                ...state,
                availableServices: action.availableServices,
                stepName: action.stepName
            };
        case ActionTypes.FORM_SET_SERVICE:
            return {
                ...state,
                service: action.service
            }
        default:
            return state;
    }
};

export default ServiceFormReducer;