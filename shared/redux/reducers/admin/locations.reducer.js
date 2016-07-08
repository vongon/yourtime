import * as ActionTypes from '../../constants/constants';


var initialState = {};

const LocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADMIN_LOCATIONS_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.ADMIN_LOCATIONS_SET_LOCATIONS:
            return {
                ...state,
                objects: action.locations
            };
        case ActionTypes.ADMIN_LOCATIONS_SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default LocationsReducer;