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
        event.vehicle_name = results.vehicle_name;
        event.workplace_name = results.workplace_name;
        event.services_objects = results.services_objects;
        done(null, event);
    });
}

export function getData() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        var appState = getState();
        var event = appState.product.serviceform.body;

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
        dispatch(setSubmitLoading(true));
        var appState = getState();
        var eventBody = appState.product.serviceform.body;
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
