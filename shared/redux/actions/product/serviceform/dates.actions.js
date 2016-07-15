import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';

export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_FORM_DATE_SET_LOADING,
        bool: bool
    };
}

export function setDate(date){
    return {
        type: ActionTypes.PRODUCT_FORM_DATE_SET_DATE,
        date: date
    }
}

export function setAvailableDates(dates){
    return {
        type: ActionTypes.PRODUCT_FORM_DATE_SET_AVAILABLE_DATES,
        dates: dates
    }
}

export function getAvailableDates() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        request
            .get('/api/days')
            .query({future_only:true})
            .end(function (err, res) {
                if (err) {
                    console.warn("Error when querying for day", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setLoading(false));
                    return;
                }
                console.log('dates queried', res.body);
                dispatch(setLoading(false));
                dispatch(setAvailableDates(res.body));
            });
    }
}