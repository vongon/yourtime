import * as ActionTypes from '../../../../constants/constants';



const SelectVehicleReducer =  (state = {}, action) => {
    switch(action.type){
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_VEHICLES:
            return {
                ...state,
                availableVehicles: action.vehicles
            };
        default:
            return state;
    }
};

export default SelectVehicleReducer;