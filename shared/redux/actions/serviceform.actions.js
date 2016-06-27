import * as ActionTypes from '../constants/constants';
import {authSetToken, authSetUser} from './auth.actions';
import request from 'superagent';


export function formSetState(formState) {
    /*
     *   This is used to convert the date from a string when the formState is recovered from auth0
     */
    if ((formState.body || {}).date) {
        var selectedDate = formState.body.date;
        if (typeof selectedDate === 'string') {
            console.log('detected string type of selected date, converting to datetype');
            formState.body.date = new Date(selectedDate)
        }
    }
    console.log('resetting serviceform state:', formState);
    return {
        type: ActionTypes.FORM_SET_STATE,
        formState: formState
    }
}

export function formSetStep(stepName) {
    return {
        type: ActionTypes.FORM_SET_STEP,
        stepName: stepName
    };
}

export function formSetWorkplace(workplace) {
    return {
        type: ActionTypes.FORM_SET_WORKPLACE,
        workplace: workplace
    }
}

export function formSetWorkplaceErrorText(text) {
    return {
        type: ActionTypes.FORM_SET_WORKPLACE_ERROR_TEXT,
        text: text
    }
}

export function formSetLoading(bool) {
    return {
        type: ActionTypes.FORM_SET_LOADING,
        bool: bool
    };
}

export function formSetAvailableWorkplaces(availableWorkplaces) {
    return {
        type: ActionTypes.FORM_SET_AVAILABLE_WORKPLACES,
        availableWorkplaces: availableWorkplaces
    };
}

export function formSetAvailableServices(availableServices) {
    return {
        type: ActionTypes.FORM_SET_AVAILABLE_SERVICES,
        availableServices: availableServices
    };
}

export function formSetService(service) {
    return {
        type: ActionTypes.FORM_SET_SERVICE,
        service: service
    };
}

export function formSetNotListedModal(bool) {
    return {
        type: ActionTypes.FORM_SET_NOTLISTED_MODAL,
        bool: bool
    }
}

export function formSetServicesModal(bool) {
    return {
        type: ActionTypes.FORM_SET_SERVICES_MODAL,
        bool: bool
    };
}

export function formSetVehicleModal(bool) {
    return {
        type: ActionTypes.FORM_SET_VEHICLE_MODAL,
        bool: bool
    }
}

export function formSetServiceErrorText(text) {
    return {
        type: ActionTypes.FORM_SET_SERVICE_ERROR_TEXT,
        text: text
    }
}

export function formSetVehicle(vehicle) {
    return {
        type: ActionTypes.FORM_SET_VEHICLE,
        vehicle: vehicle
    }
}

export function formSetVehicleErrorText(text) {
    return {
        type: ActionTypes.FORM_SET_VEHICLE_ERROR_TEXT,
        text: text
    }
}

export function formSetDate(date) {
    return {
        type: ActionTypes.FORM_SET_DATE,
        date: date
    }
}

export function formSetDateErrorText(text) {
    return {
        type: ActionTypes.FORM_SET_DATE_ERROR_TEXT,
        text: text
    }
}

export function formSetUserId(user_id) {
    return {
        type: ActionTypes.FORM_SET_USER_ID,
        user_id: user_id
    }
}

export function formReset() {
    return {
        type: ActionTypes.FORM_RESET
    }
}

export function formInitialize(lock) {
    var tokenFromHash = false;

    function getIdToken() {
        var idToken = localStorage.getItem('userToken');
        var authHash = lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
            if (authHash.id_token) {
                tokenFromHash = true;
                idToken = authHash.id_token;
                localStorage.setItem('userToken', authHash.id_token);
            }
            if (authHash.error) {
                console.log("Error signing in", authHash);
                return null;
            }
        }
        return idToken;
    }

    //set loading true
    //login in user from token if available, and restore form state
    //add user to auth
    //if user from hash, restore form state
    //get form data
    //available workplaces
    //available services
    //available dates
    //set loading false
    return (dispatch, getState) => {
        dispatch(formSetLoading(true));
        /*get form data*/
        request
        .get('/api/workplace')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if(err){
                console.warn("Error when requesting workplaces", err);
                dispatch(formSetLoading(false));
                return;
            }
            dispatch(formSetAvailableWorkplaces(res.body));
            request
            .get('/api/service')
            .set('Accept', 'application/json')
            .end(function(err, res){
                if(err){
                    console.warn("Error when requesting services", err);
                    dispatch(formSetLoading(false));
                    return;
                }
                dispatch(formSetAvailableServices(res.body));

                var token = getIdToken();
                if (token) {
                    dispatch(authSetToken(token));
                    lock.getProfile(token, function (err, user) {
                        if (err) {
                            console.warn("Error loading the Profile", err);
                            localStorage.removeItem('userToken'); //remove in the case there is an expired token
                            dispatch(authSetUser(null));
                            dispatch(formSetLoading(false));
                            return;
                        }
                        dispatch(authSetUser(user));
                        dispatch(formSetLoading(false));
                        if (user.state && tokenFromHash) {
                            //recover service form state
                            var formState = JSON.parse(user.state);
                            dispatch(formSetState(formState));
                        }

                    });

                } else {
                    dispatch(authSetUser(null));
                    dispatch(formSetLoading(false));
                }
            });

        });


    }
}


export function formSubmit(){
    return (dispatch, getState) => {
        var appState = getState();
        var body = appState.serviceform.body;
        var eventBody = {
            workplace_id: body.workplace._id,
            service_id: body.service._id,
            date: body.date,
            vehicle_make: body.vehicle.make || ' ',
            vehicle_model: body.vehicle.model || ' ',
            vehicle_year: body.vehicle.year || ' '
        };
        dispatch(formSetLoading(true));
        request
            .post('/api/event')
            .set('authorization', 'Bearer '+ appState.auth.token)
            .send(eventBody)
            .end(function(err, res){
                if(err){
                    console.warn("Error during /api/event submit", err.body);
                    dispatch(formSetLoading(false));
                    dispatch(formSetStep('error'));
                    return;
                }
                console.log('event submitted', res.body);
                dispatch(formSetLoading(false));
                dispatch(formSetStep('complete'));
            });
    }
}

