import * as ActionTypes from '../../constants/constants';
import {setSnackbarMessage} from './global.actions';
import request from 'superagent';

export function dashSetEvents(events) {
    return {
        type: ActionTypes.DASH_SET_EVENTS,
        events: events
    };
}

export function dashSetLoading(bool){
    return {
        type: ActionTypes.DASH_SET_LOADING,
        isLoading: bool
    }
}

export function dashGetEvents(){
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(dashSetLoading(true));
        request
            .get('/api/events')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .query({user_id: appState.auth.user.user_id})
            .end(function(err, res){
                if(err){
                    console.warn("Error when querying for events", err.body);
                    dispatch(setSnackbarMessage('error querying for events'));
                    dispatch(dashSetLoading(false));
                    return;
                }
                console.log('events queried', res.body);
                dispatch(dashSetLoading(false));
                dispatch(dashSetEvents(res.body));
            });
    }
}

export function dashDeleteEvent(event_id){
    return (dispatch, getState) => {
        var appState = getState();
        dispatch(dashSetLoading(true));
        request
            .delete('/api/events/'+event_id)
            .set('authorization', 'Bearer '+ appState.auth.token)
            .end(function(err, res){
                if(err){
                    console.warn("Error when deleting event", err.body);
                    dispatch(setSnackbarMessage('error when trying to delete event'));
                    dispatch(dashSetLoading(false));
                    return;
                }
                console.log('event deleted', res.body);
                dispatch(dashGetEvents());
            });
    }
}