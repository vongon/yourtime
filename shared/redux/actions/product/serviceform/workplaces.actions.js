import * as ActionTypes from '../../../constants/constants';
import request from 'superagent';
import { setSnackbarMessage } from '../global.actions';


export function setLoading(bool) {
    return {
        type: ActionTypes.PRODUCT_FORM_WORKPLACE_SET_LOADING,
        bool: bool
    };
}

export function setAvailableWorkplaces(workplaces) {
    return {
        type: ActionTypes.PRODUCT_FORM_WORKPLACE_SET_AVAILABLE_WORKPLACES,
        workplaces: workplaces
    };
}

export function setWorkplaceId(id) {
    return {
        type: ActionTypes.PRODUCT_FORM_WORKPLACE_SET_WORKPLACE,
        workplace_id: id
    };
}

export function setNotListedModal(bool){
    return {
        type: ActionTypes.PRODUCT_FORM_WORKPLACE_SET_NOTLISTED_MODAL,
        bool: bool
    }
}

export function getAvailableWorkplaces() {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        request
            .get('/api/workplaces')
            .end(function (err, res) {
                if (err) {
                    console.warn("Error when querying for workplaces", err.body);
                    dispatch(setSnackbarMessage('error '+err.body));
                    dispatch(setLoading(false));
                    return;
                }
                console.log('workplaces queried', res.body);
                dispatch(setLoading(false));
                dispatch(setAvailableWorkplaces(res.body));
            });
    }
}