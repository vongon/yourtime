import * as ActionTypes from '../../constants/constants';
import parallel from 'async/parallel';
import request from 'superagent';

export function adminServicesSetLoading(bool){
    return {
        type: ActionTypes.ADMIN_SERVICES_SET_LOADING,
        bool: bool
    };
}

export function adminServicesSetServices(services){
    return {
        type: ActionTypes.ADMIN_SERVICES_SET_SERVICES,
        services: services
    };
}

export function adminServiceSetSnackbarMessage(message){
    return {
        type: ActionTypes.ADMIN_SERVICES_SET_SNACKBAR_MESSAGE,
        message: message
    };
}

export function adminGetServices() {
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminServicesSetLoading(true));
        request
            .get('/api/services')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error when querying for events", err.body);
                    dispatch(adminServicesSetLoading(false));
                    return;
                }
                var func_array = [];
                res.body.map(function(service){
                    func_array.push(
                        (cb)=>{
                            request
                                .get('/api/workplaces/'+service.workplace_id)
                                .set('authorization', 'Bearer '+ appState.auth.token)
                                .end((err, res)=>{
                                    if(err) {
                                        console.log('error:',err);
                                        err.status === 404 ?
                                            cb(null, {...service, workplace: {}}) :
                                            cb(err);
                                        return;
                                    }
                                    cb(null, {...service, workplace: res.body});
                                });
                        }
                    );
                });

                parallel(func_array, (err, res)=>{
                    if(err){
                        console.warn("Error when querying for events", err.body);
                        dispatch(adminServicesSetLoading(false));
                        return;
                    }
                    console.log('services queried', res);
                    dispatch(adminServicesSetLoading(false));
                    dispatch(adminServicesSetServices(res));
                });
            });
    }
}


export function adminDeleteService(id){
    console.log('adminDeleteService id:', id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminServicesSetLoading(true));
        request
            .del('/api/services/'+id)
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error", err.body);
                    dispatch(adminServicesSetLoading(false));
                    dispatch(adminServiceSetSnackbarMessage('error: '+err.body));
                    return;
                }
                console.log('services deleted', res.body);
                dispatch(adminServicesSetLoading(false));
                dispatch(adminServiceSetSnackbarMessage('successfully deleted service!'));
                dispatch(adminGetServices());
            });
    }
}

export function adminEditService(service){
    console.log('adminEdiService id:', service._id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminServicesSetLoading(true));
        request
            .put('/api/services/'+service._id)
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send({...service})
            .end(function(err, res){
                if(err){
                    console.warn(err.body);
                    dispatch(adminServicesSetLoading(false));
                    dispatch(adminServiceSetSnackbarMessage('error: '+err.body));
                    return;
                }
                console.log('services edited', res.body);
                dispatch(adminServicesSetLoading(false));
                dispatch(adminServiceSetSnackbarMessage('successfully edited service!'));
                dispatch(adminGetServices());
            });
    }
}



export function adminCreateService(service){
    console.log('adminCreateService() service:',service);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminServicesSetLoading(true));
        request
            .post('/api/services/')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send({
                ...service
            })
            .end(function(err, res){
                if(err){
                    console.warn(err);
                    dispatch(adminServicesSetLoading(false));
                    dispatch(adminServiceSetSnackbarMessage('error: '+err));
                    return;
                }
                console.log('services edited', res.body);
                dispatch(adminServicesSetLoading(false));
                dispatch(adminServiceSetSnackbarMessage('successfully created service!'));
                dispatch(adminGetServices());
            });
    }
}