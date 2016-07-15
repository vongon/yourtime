import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';
import async from 'async';


export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_FORM_OVERVIEW_SET_LOADING,
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

export function getData() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        var appState = getState();
        async.parallel({
            workplace_name: (pCb)=>{
                request
                    .get('/api/workplaces/'+appState.product.serviceform.body.workplace_id)
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
                    .get('/api/vehicles/'+appState.product.serviceform.body.vehicle_id)
                    .end((err,res)=>{
                        if(err){
                            if(err.status === 404) return pCb(null, 'null');
                            return pCb(err);
                        }
                        pCb(null, res.body.name);
                    });
            },
            services_objects: (pCb)=>{
                var service_ids = appState.product.serviceform.body.services;
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
                dispatch(setSnackbarMessage('error: '+err.body));
                dispatch(setLoading(false));
                return;
            }
            dispatch(setDate(appState.product.serviceform.body.date));
            dispatch(setWorkplaceName(results.workplace_name));
            dispatch(setVehicleName(results.vehicle_name));
            dispatch(setServicesObjects(results.services_objects));
            dispatch(setLoading(false));
        });
    }
}
