import * as ActionTypes from '../../constants/constants';
import request from 'superagent';
import parallel from 'async/parallel';


export function adminLocationsSetLoading(bool) {
    return {
        type: ActionTypes.ADMIN_LOCATIONS_SET_LOADING,
        bool: bool
    };
}

export function adminLocationsSetLocations(locations) {
    return {
        type: ActionTypes.ADMIN_LOCATIONS_SET_LOCATIONS,
        locations: locations
    };
}

export function adminLocationSetSnackbarMessage(message) {
    return {
        type: ActionTypes.ADMIN_LOCATIONS_SET_SNACKBAR_MESSAGE,
        message: message
    };
}


export function adminGetLocations() {
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminLocationsSetLoading(true));
        request
            .get('/api/locations')
            .set('authorization', 'Bearer ' + appState.auth.token)
            .end(function (err, res) {
                    if (err) {
                        console.warn("Error when querying for locations", err.body);
                        dispatch(adminLocationsSetLoading(false));
                        return;
                    }
                    var func_array = [];
                    res.body.map(function (location) {
                        func_array.push( //array of functions for each location
                            (pCb)=> {
                                request
                                    .get('/api/days/')
                                    .set('authorization', 'Bearer ' + appState.auth.token)
                                    .query({location_id: location._id})
                                    .end((err, res)=> {
                                        if (err) return pCb(err);
                                        pCb(null, {...location, days: res.body});
                                    });
                            }
                        );
                    });
                    parallel(func_array, (err, results)=> {
                        if (err) {
                            console.warn("Error when querying for locations", err.body);
                            dispatch(adminLocationsSetLoading(false));
                            return;
                        }
                        console.log('locations queried', results);
                        dispatch(adminLocationsSetLoading(false));
                        dispatch(adminLocationsSetLocations(results));
                    });
                }
            );
    }
}


export function adminDeleteLocation(id) {
    console.log('adminDeleteLocation id:', id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminLocationsSetLoading(true));
        request
            .del('/api/locations/' + id)
            .set('authorization', 'Bearer ' + appState.auth.token)
            .end(function (err, res) {
                if (err) {
                    console.warn("Error when querying for locations", err.body);
                    dispatch(adminLocationsSetLoading(false));
                    dispatch(adminLocationSetSnackbarMessage('error: ' + err.body));
                    return;
                }
                //also delete days that are owned by this locations
                request
                    .get('/api/days/')
                    .set('authorization', 'Bearer ' + appState.auth.token)
                    .query({location_id:id})
                    .end(function (err, res) {
                        if(err) {
                            console.warn("Error when querying for days", err.body);
                            dispatch(adminLocationsSetLoading(false));
                            dispatch(adminLocationSetSnackbarMessage('error: ' + err.body));
                            return;
                        }
                        var func_array=[];
                        res.body.map(function(day){
                            func_array.push(
                                (pCb)=>{
                                    request
                                        .del('/api/days/'+day._id)
                                        .set('authorization', 'Bearer ' + appState.auth.token)
                                        .end(function(err, res){
                                            if(err) pCb(err);
                                            pCb(null, res.body);
                                        });
                                });
                        })
                        parallel(func_array, (err, results)=>{
                            if(err){
                                console.warn("Error when deleting for days", err.body);
                                dispatch(adminLocationsSetLoading(false));
                                dispatch(adminLocationSetSnackbarMessage('error: ' + err.body));
                                return;
                            }
                            console.log('locations deleted', results);
                            dispatch(adminLocationsSetLoading(false));
                            dispatch(adminLocationSetSnackbarMessage('successfully deleted location!'));
                            dispatch(adminGetLocations());
                        });
                    });
            });
    }
}


export function adminEditLocation(location) {
    console.log('adminEdiLocation id:', location._id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminLocationsSetLoading(true));
        request
            .put('/api/locations/' + location._id)
            .set('authorization', 'Bearer ' + appState.auth.token)
            .send({
                name: location.name
            })
            .end(function (err, res) {
                if (err) {
                    console.warn(err.body);
                    dispatch(adminLocationsSetLoading(false));
                    dispatch(adminLocationSetSnackbarMessage('error: ' + err.body));
                    return;
                }
                console.log('locations edited', res.body);
                dispatch(adminLocationsSetLoading(false));
                dispatch(adminLocationSetSnackbarMessage('successfully edited location!'));
                dispatch(adminGetLocations());
            });
    }
}


export function adminCreateLocation(location) {
    console.log('adminCreateLocation() location:', location);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminLocationsSetLoading(true));
        request
            .post('/api/locations/')
            .set('authorization', 'Bearer ' + appState.auth.token)
            .send({
                name: location.name
            })
            .end(function (err, res) {
                if (err) {
                    console.warn(err);
                    dispatch(adminLocationsSetLoading(false));
                    dispatch(adminLocationSetSnackbarMessage('error: ' + err));
                    return;
                }
                console.log('locations edited', res.body);
                dispatch(adminLocationsSetLoading(false));
                dispatch(adminLocationSetSnackbarMessage('successfully created location!'));
                dispatch(adminGetLocations());
            });
    }
}