import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import { formSetState } from './serviceform.actions';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';


export function authRequestingUser(){
    return{
        type: ActionTypes.AUTH_REQUESTING_USER
    };
}

export function authSetToken(token){
    return {
        type: ActionTypes.AUTH_SET_TOKEN,
        token: token
    };
}

export function authDiscardToken(){
    return {
        type: ActionTypes.AUTH_DISCARD_TOKEN
    };
}

export function authSetUser(user){
    return {
        type: ActionTypes.AUTH_SET_USER,
        user: user
    }
}

export function authSetLock(lock){
    return {
        type: ActionTypes.AUTH_SET_LOCK,
        lock: lock
    }
}

export function authSetSnackbarMessage(message){
    return {
        type: ActionTypes.AUTH_SET_SNACKBAR_MESSAGE,
        message: message
    };
}

export function authGetUser(lock) {
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
        
    // Sets isLoading: true,
    // then looks for localStorage or URL hash token and gets corresponding user if available
    // then sets the user, and if user.state exists then sets the service form state
    return (dispatch, getState) => {
        dispatch(authRequestingUser());
        var token = getIdToken();
        if(token){
            dispatch(authSetToken(token));
            lock.getProfile(token, function(err, user){
                if (err) {
                    console.warn("Error loading the Profile", err);
                    localStorage.removeItem('userToken'); //remove in the case there is an expired token
                    dispatch(authSetUser(null));
                    return;
                }
                dispatch(authSetUser(user));
            });

        } else {
            dispatch(authSetUser(null));
        }
    }
}

export function authLogOut(){
    return (dispatch, getState) => {
        localStorage.removeItem('userToken');
        dispatch(authDiscardToken());
    }
}