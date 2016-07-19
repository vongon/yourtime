import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';
import async from 'async';

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

export function setShowCreateView(bool){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_CREATE_VIEW,
        bool: bool
    }
}

export function setAvailableMakes(makes){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_MAKES,
        makes: makes
    }
}

export function setAvailableModels(models){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_MODELS,
        models: models
    }
}

export function setAvailableYears(years){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_YEARS,
        years: years
    }
}

export function setAvailableStyles(styles){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_AVAILABLE_STYLES,
        styles: styles
    }
}

export function setStylesLoading(bool){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_STYLES_LOADING,
        bool: bool
    }
}

export function setModel(model){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_MODEL,
        model: model
    };
}

export function setMake(make){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_MAKE,
        make: make
    };
}

export function setYear(year){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_YEAR,
        year: year
    };
}

export function setStyle(style){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_STYLE,
        style: style
    };
}

export function setTabValue(tab_value){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_TAB_VALUE,
        tab_value: tab_value
    };
}

export function setNewVehicle(obj){
    return {
        type: ActionTypes.PRODUCT_FORM_VEHICLE_SET_NEW_VEHICLE,
        newVehicle: obj
    };
}

export function getAvailableVehicles() {
    return (dispatch, getState) => {
        var appState = getState();
        if(!appState.auth.token) return dispatch(setAvailableVehicles([]));

        dispatch(setLoading(true));

        async.parallel({
            availableVehicles: (pCb)=>{
                request
                    .get('/api/vehicles')
                    .set('authorization', 'Bearer '+ appState.auth.token)
                    .end(function (err, res) {
                        if (err) {
                            return pCb(err);
                        }
                        pCb(null, res.body);
                    });
            },
            availableMakes: (pCb)=>{
                request
                    .get('/api/edmunds/makes')
                    .end(function (err, res) {
                        if (err) {
                            return pCb(err);
                        }
                        pCb(null, res.body);
                    });
            }
        }, (err, results)=>{
            if (err) {
                console.warn("Error when querying for vehicles", err.body);
                dispatch(setSnackbarMessage('error '+err.body));
                dispatch(setLoading(false));
                return;
            }
            dispatch(setAvailableVehicles(results.availableVehicles));
            dispatch(setAvailableMakes(results.availableMakes));
            dispatch(setLoading(false));
        });


    }
}

export function getAvailableStyles(){
    return (dispatch, getState) => {
        var appState=getState();
        if(!appState.product.serviceform.ui.selectvehicle.make) return;
        if(!appState.product.serviceform.ui.selectvehicle.model) return;
        if(!appState.product.serviceform.ui.selectvehicle.year) return;
        dispatch(setStylesLoading(true));
        var make = appState.product.serviceform.ui.selectvehicle.make;
        var model = appState.product.serviceform.ui.selectvehicle.model;
        var year = appState.product.serviceform.ui.selectvehicle.year;
        request
            .get('/api/edmunds/styles')
            .query({make: make})
            .query({model: model})
            .query({year: year})
            .end((err, res)=>{
                if(err) {
                    console.warn("Error when querying for vehicles", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setStylesLoading(false));
                    return;
                }
                dispatch(setAvailableStyles(res.body));
                dispatch(setStylesLoading(false));
            });
    }
}

export function resetCreateVehicleForm(){
    return (dispatch, getState) => {
        dispatch(setModel(null));
        dispatch(setYear(null));
        dispatch(setMake(null));
        dispatch(setStyle(null));

        dispatch(setAvailableModels(null));
        dispatch(setAvailableYears(null));
        dispatch(setAvailableStyles(null));

        dispatch(setNewVehicle(null));

        dispatch(setTabValue('make'));
    }
}

export function postNewVehicle() {
    return (dispatch, getState) => {
        var appState=getState();
        var style_obj = appState.product.serviceform.ui.selectvehicle.newVehicle;
        dispatch(setLoading(true));
        request
            .post('/api/vehicles')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send({
                edmunds_id: style_obj.id,
                name: style_obj.make.name + ' ' + style_obj.model.name + ' ' + style_obj.year.year + ' ' + style_obj.trim})
            .end((err, res)=>{
                if(err){
                    console.warn("Error when creating vehicle", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setLoading(false));
                    return;
                }
                dispatch(setVehicleId(res.body._id));
                dispatch(setShowCreateView(false));
                dispatch(resetCreateVehicleForm());
                dispatch(getAvailableVehicles());
            });

    }
}