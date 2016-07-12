import * as ActionTypes from '../../constants/constants';
import { adminGetLocations } from './locations.actions';
import request from 'superagent';
import parallel from 'async/parallel';


export function adminDaysSetLoading(bool) {
    return {
        type: ActionTypes.ADMIN_DAYS_SET_LOADING,
        bool: bool
    };
}

export function adminDaysSetDays(days) {
    return {
        type: ActionTypes.ADMIN_DAYS_SET_DAYS,
        days: days
    };
}

export function adminDaySetSnackbarMessage(message) {
    return {
        type: ActionTypes.ADMIN_DAYS_SET_SNACKBAR_MESSAGE,
        message: message
    };
}

/*
export function adminGetDays() {
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminDaysSetLoading(true));
        request
            .get('/api/days')
            .set('authorization', 'Bearer ' + appState.auth.token)
            .end(function (err, res) {
                    if (err) {
                        console.warn("Error when querying for days", err.body);
                        dispatch(adminDaysSetLoading(false));
                        return;
                    }
                    var func_array = [];
                    res.body.map(function (day) {
                        func_array.push( //array of functions for each day
                            (pCb)=> {
                                request
                                    .get('/api/days/')
                                    .set('authorization', 'Bearer ' + appState.auth.token)
                                    .query({day_id: day._id})
                                    .end((err, res)=> {
                                        if (err) return pCb(err);
                                        pCb(null, {...day, days: res.body});
                                    });
                            }
                        );
                    });
                    parallel(func_array, (err, results)=> {
                        if (err) {
                            console.warn("Error when querying for days", err.body);
                            dispatch(adminDaysSetLoading(false));
                            return;
                        }
                        console.log('days queried', results);
                        dispatch(adminDaysSetLoading(false));
                        dispatch(adminDaysSetDays(results));
                    });
                }
            );
    }
}
*/


export function adminEditDay(day) {
    console.log('adminEdiDay id:', day._id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminDaysSetLoading(true));
        request
            .put('/api/days/' + day._id)
            .set('authorization', 'Bearer ' + appState.auth.token)
            .send({...day})
            .end(function (err, res) {
                if (err) {
                    console.warn(err.body);
                    dispatch(adminDaysSetLoading(false));
                    dispatch(adminDaySetSnackbarMessage('error: ' + err.body));
                    return;
                }
                console.log('days edited', res.body);
                dispatch(adminDaysSetLoading(false));
                dispatch(adminDaySetSnackbarMessage('successfully edited day!'));
                dispatch(adminGetLocations());
            });
    }
}


export function adminCreateDay(day) {
    console.log('adminPostDay id:', day._id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminDaysSetLoading(true));
        request
            .post('/api/days/')
            .set('authorization', 'Bearer ' + appState.auth.token)
            .send({...day})
            .end(function (err, res) {
                if (err) {
                    console.warn(err.body);
                    dispatch(adminDaysSetLoading(false));
                    dispatch(adminDaySetSnackbarMessage('error: ' + err.body));
                    return;
                }
                console.log('days edited', res.body);
                dispatch(adminDaysSetLoading(false));
                dispatch(adminDaySetSnackbarMessage('successfully created day!'));
                dispatch(adminGetLocations());
            });
    }
}



export function adminDeleteDay(day_id) {
    console.log('adminDeleteDay id:', day_id);
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminDaysSetLoading(true));
        request
            .del('/api/days/' + day_id)
            .set('authorization', 'Bearer ' + appState.auth.token)
            .end(function (err, res) {
                if (err) {
                    console.warn("Error", err.body);
                    dispatch(adminDaysSetLoading(false));
                    dispatch(adminDaySetSnackbarMessage('error: ' + err.body));
                    return;
                }
                console.log('day deleted', res.body);
                dispatch(adminDaysSetLoading(false));
                dispatch(adminDaySetSnackbarMessage('successfully deleted day!'));
                dispatch(adminGetLocations());
            });
    }
}
