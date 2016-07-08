import * as ActionTypes from '../../constants/constants';


var initialState = {};

const ServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADMIN_SERVICES_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.ADMIN_SERVICES_SET_SERVICES:
            return {
                ...state,
                objects: action.services
            };
        case ActionTypes.ADMIN_SERVICES_SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default ServicesReducer;