import * as ActionTypes from '../constants/constants';


var initialState = {};

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.DASH_SET_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case ActionTypes.DASH_SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        default:
            return state;
    }
};

export default DashboardReducer;