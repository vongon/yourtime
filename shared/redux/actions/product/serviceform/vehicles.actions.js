import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';

export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_LOADING,
        bool: bool
    };
}

export function setVehicleId(vehicle_id){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_VEHICLE,
        vehicle_id: vehicle_id
    }
}

export function setAvailableVehicles(vehicles){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_VEHICLES,
        vehicles: vehicles
    }
}

export function getAvailableVehicles() {
    return (dispatch, getState) => {
        var appState = getState();
        if(!appState.auth.token) return dispatch(setAvailableVehicles([]));

        dispatch(setLoading(true));
        request
            .get('/api/vehicles')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function (err, res) {
                if (err) {
                    console.warn("Error when querying for vehicles", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setLoading(false));
                    return;
                }
                console.log('vehicles queried', res.body);
                dispatch(setLoading(false));
                dispatch(setAvailableVehicles(res.body));
            });
    }
}