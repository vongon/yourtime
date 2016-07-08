import * as ActionTypes from '../../constants/constants';


var initialState = {};

const WorkplacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADMIN_WORKPLACES_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.ADMIN_WORKPLACES_SET_WORKPLACES:
            return {
                ...state,
                objects: action.workplaces
            };
        case ActionTypes.ADMIN_WORKPLACES_SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default WorkplacesReducer;