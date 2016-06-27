import * as ActionTypes from '../constants/constants';
import { combineReducers } from 'redux';

const initialUiState = {
    stepName: 'chooseWorkplace',
    servicesModal: false,
    vehicleModal: false
};

const ServiceFormUiReducer = (state = initialUiState, action) => {
    switch (action.type) {
        case ActionTypes.FORM_RESET:
            return initialUiState;

        case ActionTypes.FORM_SET_STATE:
            return action.formState.ui;
        
        case ActionTypes.FORM_SET_STEP:
            return {
                ...state,
                stepName: action.stepName
            };

        case ActionTypes.FORM_SET_LOADING:
            return {
                ...state,
                isLoading: action.bool
            };
        case ActionTypes.FORM_SET_AVAILABLE_WORKPLACES:
            return {
                ...state,
                availableWorkplaces: action.availableWorkplaces
            };
        case ActionTypes.FORM_SET_AVAILABLE_SERVICES:
            return {
                ...state,
                availableServices: action.availableServices
            };


        /*
         *
         * Error Text Setters
         */
        case ActionTypes.FORM_SET_WORKPLACE_ERROR_TEXT:
            return {
                ...state,
                workplaceErrorText: action.text
            };
        case ActionTypes.FORM_SET_SERVICE_ERROR_TEXT:
            return {
                ...state,
                serviceErrorText: action.text
            };
        case ActionTypes.FORM_SET_VEHICLE_ERROR_TEXT:
            return {
                ...state,
                vehicleErrorText: action.text
            };
        case ActionTypes.FORM_SET_DATE_ERROR_TEXT:
            return {
                ...state,
                dateErrorText: action.text
            }

        /*
        *
        * Modal Visible Setters
         */
        case ActionTypes.FORM_SET_NOTLISTED_MODAL:
            return {
                ...state,
                notListedModal: action.bool
            };
        case ActionTypes.FORM_SET_SERVICES_MODAL:
            return {
                ...state,
                servicesModal: action.bool
            };
        case ActionTypes.FORM_SET_VEHICLE_MODAL:
            return {
                ...state,
                vehicleModal: action.bool
            };
        default:
            return state;
    }
};

const initialBodyState = {vehicle:{}};

const ServiceFormBodyReducer =  (state = initialBodyState, action) => {
    switch(action.type){
        case ActionTypes.FORM_RESET:
            return initialBodyState;

        case ActionTypes.FORM_SET_STATE:
            return action.formState.body;

        case ActionTypes.FORM_SET_WORKPLACE:
            return {
                ...state,
                workplace: action.workplace
            };
        case ActionTypes.FORM_SET_SERVICE:
            return {
                ...state,
                service: action.service
            };
        case ActionTypes.FORM_SET_VEHICLE:
            return {
                ...state,
                vehicle: action.vehicle
            };
        case ActionTypes.FORM_SET_DATE:
            return {
                ...state,
                date: action.date
            };
        default:
            return state;
    }
}

export default combineReducers({
    ui: ServiceFormUiReducer,
    body: ServiceFormBodyReducer
});