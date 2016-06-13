import * as ActionTypes from '../constants/constants';
import _ from 'lodash';
const initialState = {counters: []};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COUNTER':
            var newCounter = {
                id: action.id,
                val: action.val
            };
            var newCounters = [...state.counters, newCounter];
            return {counters: newCounters};

        case 'REMOVE_COUNTER':
            var newCounters = state.counters.filter(
                function (counter) {
                    return action.id !== counter.id;
                });
            return {counters: newCounters};

        case 'INCREMENT_COUNTER':
            var newCounters = [];
            _.forEach(state.counters, function (counter) {
                var newCounter = {
                    id: counter.id,
                    val: counter.val
                }
                if (newCounter.id === action.id) {
                    newCounter.val++;
                }
                newCounters.push(newCounter);
            });
            return {counters: newCounters};

        case 'DECREMENT_COUNTER':
            var newCounters = [];
            _.forEach(state.counters, function (counter) {
                var newCounter = {
                    id: counter.id,
                    val: counter.val
                }
                if (newCounter.id === action.id) {
                    newCounter.val--;
                }
                newCounters.push(newCounter);
            });
            return {counters: newCounters};

        default:
            return state;
    }
};

export default postReducer;

