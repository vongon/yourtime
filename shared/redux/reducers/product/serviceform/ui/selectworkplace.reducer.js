import * as ActionTypes from '../../../../constants/constants';



const SelectWorkplaceReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_FORM_WORKPLACE_SET_AVAILABLE_WORKPLACES:
            return {
                ...state,
                availableWorkplaces: action.workplaces
            };
        case ActionTypes.PRODUCT_FORM_WORKPLACE_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.PRODUCT_FORM_WORKPLACE_SET_NOTLISTED_MODAL:
            return {
                ...state,
                showModalNotListed: action.bool
            }
        default:
            return state;
    }
}

export default SelectWorkplaceReducer;