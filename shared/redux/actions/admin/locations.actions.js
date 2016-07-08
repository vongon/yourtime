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
                var func_array_locations = [];
                res.body.map(function (location) {
                    func_array_locations.push( //array of functions for each location
                        (pCb_location)=> {
                            var func_array_days = [];
                            location.days.map(function (dayId) {
                                func_array_days.push(
                                    (pCb_day) => { //array of functions for each day of a location
                                        request
                                            .get('/api/days/' + dayId)
                                            .set('authorization', 'Bearer ' + appState.auth.token)
                                            .end((err, res)=> {
                                                if (err) {
                                                    err.status === 404 ?
                                                        pCb_day(null, {dayId: dayId}) :
                                                        pCb_day(err);
                                                    return
                                                }
                                                pCb_day(null, {dayId: dayId, ...res.body});
                                            });
                                    }
                                );
                            });
                            parallel(func_array_days, (err, results)=> {
                                if (err) return pCb_location(err);
                                pCb_location(null, {...location, days: results});
                            });
                        }
                    );
                });

                parallel(func_array_locations, (err, results)=> {
                    if (err) {
                        console.warn("Error when querying for locations", err.body);
                        dispatch(adminLocationsSetLoading(false));
                        return;
                    }
                    console.log('locations queried', results);
                    dispatch(adminLocationsSetLoading(false));
                    dispatch(adminLocationsSetLocations(results));
                });
            });
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
                    console.warn("Error when querying for events", err.body);
                    dispatch(adminLocationsSetLoading(false));
                    dispatch(adminLocationSetSnackbarMessage('error: ' + err.body));
                    return;
                }
                console.log('locations deleted', res.body);
                dispatch(adminLocationsSetLoading(false));
                dispatch(adminLocationSetSnackbarMessage('successfully deleted location!'));
                dispatch(adminGetLocations());
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