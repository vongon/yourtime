import * as ActionTypes from '../../constants/constants';


var initialState = {};

const DaysReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADMIN_DAYS_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.ADMIN_DAYS_SET_DAYS:
            return {
                ...state,
                objects: action.events
            };
        case ActionTypes.ADMIN_DAYS_SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default DaysReducer;