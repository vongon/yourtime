import * as ActionTypes from '../../constants/constants';
import parallel from 'async/parallel';
import request from 'superagent';

export function adminEventsSetLoading(bool){
    return {
        type: ActionTypes.ADMIN_EVENTS_SET_LOADING,
        bool: bool
    };
}

export function adminEventsSetEvents(events){
    return {
        type: ActionTypes.ADMIN_EVENTS_SET_EVENTS,
        events: events
    };
}

export function adminEventSetSnackbarMessage(message){
    return {
        type: ActionTypes.ADMIN_EVENTS_SET_SNACKBAR_MESSAGE,
        message: message
    };
}


export function adminGetEvents() {
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(adminEventsSetLoading(true));
        request
            .get('/api/events')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error when querying for events", err.body);
                    dispatch(adminEventsSetLoading(false));
                    return;
                }
                var func_array = [];
                res.body.map(function(event){
                    func_array.push(
                        (cb)=>{
                            request
                                .get('/api/workplaces/'+event.workplace_id)
                                .set('authorization', 'Bearer '+ appState.auth.token)
                                .end((err, res)=>{
                                    if(err) {
                                        console.log('error:',err);
                                        err.status === 404 ?
                                            cb(null, {...event, workplace: {}}) :
                                            cb(err);
                                        return;
                                    }
                                    cb(null, {...event, workplace: res.body});
                                });
                        }
                    );
                });

                parallel(func_array, (err, res)=>{
                    if(err){
                        console.warn("Error when querying for events", err.body);
                        dispatch(adminEventsSetLoading(false));
                        return;
                    }
                    console.log('events queried', res);
                    dispatch(adminEventsSetLoading(false));
                    dispatch(adminEventsSetEvents(res));
                });
            });
    }
}