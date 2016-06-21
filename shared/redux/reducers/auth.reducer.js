import * as ActionTypes from '../constants/constants';


var initialState = {};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        //set reference to Auth0 Lock in app state
        case ActionTypes.AUTH_SET_LOCK:
            return {
                ...state,
                lock: action.lock
            };
        //requesting user info, set loading flag
        case ActionTypes.AUTH_REQUESTING_USER:
            return {
                ...state,
                isLoading: true
            };
        //saves token into store
        case ActionTypes.AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        //discards current token (logout), need to remove from localstorage too?
        case ActionTypes.AUTH_DISCARD_TOKEN:
            return {
                ...state,
                token: null,
                user: null
            };
        //save current user
        case ActionTypes.AUTH_SET_USER:
            return {
                ...state,
                isLoading: false,
                user: action.user
            }
        default:
            return state;
    }
};

export default AuthReducer;