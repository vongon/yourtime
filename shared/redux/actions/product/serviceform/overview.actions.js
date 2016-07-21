import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';
import async from 'async';


export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_LOADING,
        bool: bool
    };
}

export function setSubmitLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_SUBMIT_LOADING,
        bool: bool
    }
}

export function setSubmitSuccess(bool){
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_SUBMIT_SUCCESS,
        bool: bool
    };
}

export function setWorkplaceName(workplace_name) {
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_WORKPLACE_NAME,
        workplace_name: workplace_name
    };
}

export function setVehicleName(vehicle_name) {
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_VEHICLE_NAME,
        vehicle_name: vehicle_name
    };
}

export function setServicesObjects(services_objects){
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_SERVICES_OBJECTS,
        services_objects: services_objects
    };
}

export function setDate(date){
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_DATE,
        date: date
    };
}

export function setDiscountCode(discount_code){
    return {
        type: ActionTypes.PRODUCT_OVERVIEW_SET_DISCOUNT_CODE,
        discount_code: discount_code
    };
}

export function asyncGetEventData(event, done){
    async.parallel({
        workplace_name: (pCb)=>{
            request
                .get('/api/workplaces/'+event.workplace_id)
                .end((err,res)=>{
                    if(err){
                        if(err.status === 404) return pCb(null, 'null');
                        return pCb(err);
                    }
                    pCb(null, res.body.name);
                });
        },
        vehicle_name: (pCb)=>{
            if(event.vehicle_name) return pCb(null, event.vehicle_name);
            request
                .get('/api/vehicles/'+event.vehicle_id)
                .end((err,res)=>{
                    if(err){
                        if(err.status === 404) return pCb(null, 'null');
                        return pCb(err);
                    }
                    pCb(null, res.body.name);
                });
        },
        services_objects: (pCb)=>{
            var service_ids = event.services;
            async.map(service_ids,
                (id, mCb)=>{
                    request
                        .get('/api/services/'+id)
                        .end((err,res)=>{
                            if(err){
                                if(err.status === 404) return mCb(null, 'null');
                                return mCb(err);
                            }
                            mCb(null, res.body);
                        });
                },
                (err, results)=>{
                    if(err) return pCb(err);
                    pCb(null, results);
                });
        }
    },(err, results)=>{
        if(err){
            return done(err);
        }
        event = {...event, vehicle_name: results.vehicle_name};
        event = {...event, workplace_name: results.workplace_name};
        event = {...event, services_objects : results.services_objects};
        done(null, event);
    });
}

export function getData() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        var appState = getState();
        var event = appState.product.serviceform.body;


        if(event.vehicle_id === 'new'){
            var availableVehicles = appState.product.serviceform.ui.selectvehicle.availableVehicles || [];
            var vehicle_name = null;
            for(var i=0; i<availableVehicles.length; i++){
                var vehicle = availableVehicles[i];
                if(vehicle._id === 'new'){
                    vehicle_name = vehicle.name;
                }
            }
            if(vehicle_name !== null) {
                event = {...event, vehicle_name : vehicle_name};
            } else {
                event = {...event, vehicle_name : 'not found'};
            }
        }

        asyncGetEventData(event,(err, event)=>{
            if(err){
                dispatch(setSnackbarMessage('error trying to get event data'));
                dispatch(setLoading(false));
                return;
            }
            dispatch(setDate(event.date));
            dispatch(setWorkplaceName(event.workplace_name));
            dispatch(setVehicleName(event.vehicle_name));
            dispatch(setServicesObjects(event.services_objects));
            dispatch(setLoading(false));
        });
    }
}

export function submitServiceformBody() {
    return (dispatch, getState) => {
        var appState = getState();
        if(!appState.auth.token) return dispatch(setSnackbarMessage('need to be logged in'));

        dispatch(setSubmitLoading(true));
        var eventBody = appState.product.serviceform.body;
        if(eventBody.vehicle_id === 'new'){
            //post vehicle object first, then post event
            var availableVehicles = appState.product.serviceform.ui.selectvehicle.availableVehicles || [];
            var vehicleToPost = null;
            for(var i=0; i<availableVehicles.length; i++){
                var vehicle = availableVehicles[i];
                if(vehicle._id === 'new') vehicleToPost = vehicle;
            }
            if(vehicleToPost === null){
                dispatch(setSnackbarMessage('error: invalid vehicle'));
                dispatch(setSubmitLoading(false));
                return;
            }
            request
                .post('/api/vehicles/')
                .set('authorization', 'Bearer '+ appState.auth.token)
                .send(vehicleToPost)
                .end((err, res)=>{
                    if(err){
                        dispatch(setSnackbarMessage('error: '+err.body));
                        dispatch(setSubmitLoading(false));
                        return;
                    }
                    var vehicle = res.body;
                    eventBody = {...eventBody, vehicle_id: vehicle._id};
                    request
                        .post('/api/events/')
                        .set('authorization', 'Bearer '+ appState.auth.token)
                        .send(eventBody)
                        .end((err, res)=>{
                            if(err){
                                dispatch(setSnackbarMessage('error: '+err.body));
                                dispatch(setSubmitLoading(false));
                                return;
                            }
                            dispatch(setSubmitLoading(false));
                            dispatch(setSubmitSuccess(true));
                        });
                });



        } else {
            //post event as normal
            request
                .post('/api/events/')
                .set('authorization', 'Bearer '+ appState.auth.token)
                .send(eventBody)
                .end((err, res)=>{
                    if(err){
                        dispatch(setSnackbarMessage('error: '+err.body));
                        dispatch(setSubmitLoading(false));
                        return;
                    }
                    dispatch(setSubmitLoading(false));
                    dispatch(setSubmitSuccess(true));
                });
        }


    }
}
