import * as ActionTypes from '../../constants/constants';
import parallel from 'async/parallel';
import request from 'superagent';

export function adminWorkplacesSetLoading(bool){
    return {
        type: ActionTypes.ADMIN_WORKPLACES_SET_LOADING,
        bool: bool
    };
}

export function adminWorkplacesSetWorkplaces(workplaces){
    return {
        type: ActionTypes.ADMIN_WORKPLACES_SET_WORKPLACES,
        workplaces: workplaces
    };
}

export function adminWorkplaceSetSnackbarMessage(message){
    return {
        type: ActionTypes.ADMIN_WORKPLACES_SET_SNACKBAR_MESSAGE,
        message: message
    };
}

export function adminGetWorkplaces() {
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminWorkplacesSetLoading(true));
        request
            .get('/api/workplaces')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error when querying for workplaces", err.body);
                    dispatch(adminWorkplacesSetLoading(false));
                    return;
                }
                var func_array = [];
                res.body.map(function(workplace){
                    func_array.push(
                        (cb)=>{
                            request
                                .get('/api/locations/'+workplace.location_id)
                                .set('authorization', 'Bearer '+ appState.auth.token)
                                .end((err, res)=>{
                                        if(err) {
                                            console.log('error:',err);
                                            err.status === 404 ?
                                                cb(null, {...workplace, location: {}}) :
                                                cb(err);
                                            return;
                                        }
                                        cb(null, {...workplace, location: res.body});
                                });
                        }
                    );
                });

                parallel(func_array, (err, res)=>{
                    if(err){
                        console.warn("Error when querying for workplaces", err.body);
                        dispatch(adminWorkplacesSetLoading(false));
                        return;
                    }
                    console.log('workplaces queried', res);
                    dispatch(adminWorkplacesSetLoading(false));
                    dispatch(adminWorkplacesSetWorkplaces(res));
                });
            });
    }
}


export function adminDeleteWorkplace(id){
    console.log('adminDeleteWorkplace id:', id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminWorkplacesSetLoading(true));
        request
            .del('/api/workplaces/'+id)
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error", err.body);
                    dispatch(adminWorkplacesSetLoading(false));
                    dispatch(adminWorkplaceSetSnackbarMessage('error: '+err.body));
                    return;
                }
                console.log('workplaces deleted', res.body);
                dispatch(adminWorkplacesSetLoading(false));
                dispatch(adminWorkplaceSetSnackbarMessage('successfully deleted workplace!'));
                dispatch(adminGetWorkplaces());
            });
    }
}


export function adminEditWorkplace(workplace){
    console.log('adminEdiWorkplace id:', workplace._id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminWorkplacesSetLoading(true));
        request
            .put('/api/workplaces/'+workplace._id)
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send({...workplace})
            .end(function(err, res){
                if(err){
                    console.warn(err.body);
                    dispatch(adminWorkplacesSetLoading(false));
                    dispatch(adminWorkplaceSetSnackbarMessage('error: '+err.body));
                    return;
                }
                console.log('workplaces edited', res.body);
                dispatch(adminWorkplacesSetLoading(false));
                dispatch(adminWorkplaceSetSnackbarMessage('successfully edited workplace!'));
                dispatch(adminGetWorkplaces());
            });
    }
}


export function adminCreateWorkplace(workplace){
    console.log('adminCreateWorkplace() workplace:',workplace);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminWorkplacesSetLoading(true));
        request
            .post('/api/workplaces/')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send({
                name: workplace.name,
                location_id: workplace.location_id
            })
            .end(function(err, res){
                if(err){
                    console.warn(err);
                    dispatch(adminWorkplacesSetLoading(false));
                    dispatch(adminWorkplaceSetSnackbarMessage('error: '+err));
                    return;
                }
                console.log('workplaces edited', res.body);
                dispatch(adminWorkplacesSetLoading(false));
                dispatch(adminWorkplaceSetSnackbarMessage('successfully created workplace!'));
                dispatch(adminGetWorkplaces());
            });
    }
}