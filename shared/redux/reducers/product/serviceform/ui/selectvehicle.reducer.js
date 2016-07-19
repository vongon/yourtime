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
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_CREATE_VIEW:
            return {
                ...state,
                showCreateView: action.bool
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_MAKES:
            return {
                ...state,
                availableMakes: action.makes
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_MODELS:
            return {
                ...state,
                availableModels: action.models
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_YEARS:
            return {
                ...state,
                availableYears: action.years
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_STYLES:
            return {
                ...state,
                availableStyles: action.styles
            }
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_STYLES_LOADING:
            return {
                ...state,
                stylesIsLoading: action.bool
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_MODEL:
            return {
                ...state,
                model: action.model
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_MAKE:
            return {
                ...state,
                make: action.make
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_YEAR:
            return {
                ...state,
                year: action.year
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_STYLE:
            return {
                ...state,
                style: action.style
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_TAB_VALUE:
            return {
                ...state,
                tab_value: action.tab_value
            };
        case ActionTypes.PRODUCT_FORM_VEHICLE_SET_NEW_VEHICLE:
            return {
                ...state,
                newVehicle: action.newVehicle
            };
        default:
            return state;
    }
};

export default SelectVehicleReducer;