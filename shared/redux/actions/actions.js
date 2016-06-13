import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

var counterId = 0;
export function addCounter() {
    return {
        type: 'ADD_COUNTER',
        id: counterId++,
        val: 0
    };
}

export function removeCounter(id) {
    return {
        type: 'REMOVE_COUNTER',
        id: id
    };
}

export function incrementCounter(id) {
    return {
        type: 'INCREMENT_COUNTER',
        id: id
    };
}

export function decrementCounter(id) {
    return {
        type: 'DECREMENT_COUNTER',
        id: id
    };
}
