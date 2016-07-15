import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';


export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_FORM_SERVICE_SET_LOADING,
        bool: bool
    };
}

export function setAvailableServices(availableServices) {
    return {
        type: ActionTypes.PRODUCT_FORM_SERVICE_SET_AVAILABLE_SERVICES,
        availableServices: availableServices
    };
}

export function setServices(services) {
    return {
        type: ActionTypes.PRODUCT_FORM_SERVICE_SET_SERVICES,
        services: services
    };
}

export function getAvailableServices() {
    return (dispatch, getState) => {
        var appState=getState();
        if(appState.product.serviceform.ui.selectservice.availableServices){
            return; //don't reload if we already have the services
        }
        dispatch(setLoading(true));
        request
            .get('/api/services')
            .end(function (err, res) {
                if (err) {
                    console.warn("Error when querying for services", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setLoading(false));
                    return;
                }
                console.log('services queried', res.body);
                dispatch(setLoading(false));
                dispatch(setAvailableServices(res.body));
            });
    }
}

export function addServiceId(id){
    return (dispatch, getState) => {
        var appState = getState();
        var services = appState.product.serviceform.body.services || [];
        services = [...services, id];
        dispatch(setServices(services));
    }
}

export function setServiceIdByIndex(idx, id){
    return (dispatch, getState) => {
        var appState = getState();
        var services = appState.product.serviceform.body.services || [];
        if(idx > services.length-1){
            dispatch(setSnackbarMessage('error: service index out of range'));
            return;
        }
        services = [
            ...services.slice(0, idx),
            id,
            ...services.slice(idx+1)
        ];
        dispatch(setServices(services));
    }
}

export function removeServiceIdByIndex(idx) {
    return (dispatch, getState) => {
        var appState = getState();
        var services = appState.product.serviceform.body.services || [];
        if (idx > services.length - 1) {
            dispatch(setSnackbarMessage('error: service index out of range'));
            return;
        }
        services = [
            ...services.slice(0, idx),
            ...services.slice(idx + 1)
        ];
        dispatch(setServices(services));
    }
}