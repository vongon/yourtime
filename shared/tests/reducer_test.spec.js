import expect from 'expect';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import {addCounter, removeCounter, incrementCounter, decrementCounter} from '../redux/actions/auth.actions';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
    it('action ADD_COUNTER is working', ()=> {
        const stateBefore = {counters: []};
        const stateAfter = {counters: [{id: 0, val: 0}]};
        const action = addCounter();

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });

    it('action REMOVE_COUNTER is working', ()=> {
        const stateBefore = {counters: [{id: 0, val: 0}]};
        const stateAfter = {counters: []};
        const action = removeCounter(0);

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });
    it('action REMOVE_COUNTER is working', ()=> {
        const stateBefore = {counters: [{id: 0, val: 0}, {id: 1, val: 0}, {id: 2, val: 0}]};
        const stateAfter = {counters: [{id: 0, val: 0}, {id: 2, val: 0}]};
        const action = removeCounter(1);

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });
    it('action REMOVE_COUNTER is working', ()=> {
        const stateBefore = {counters: [{id: 0, val: 0}, {id: 1, val: 0}, {id: 2, val: 0}]};
        const stateAfter = {counters: [{id: 0, val: 0}, {id: 1, val: 0}, {id: 2, val: 0}]};
        const action = removeCounter(3);

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });

    it('action INCREMENT_COUNTER is working', ()=> {
        const stateBefore = {counters: [{id: 0, val: 0}, {id: 1, val: 0}, {id: 2, val: 0}]};
        const stateAfter = {counters: [{id: 0, val: 0}, {id: 1, val: 1}, {id: 2, val: 0}]};
        const action = incrementCounter(1);

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });

    it('action DECREMENT_COUNTER is working', ()=> {
        const stateBefore = {counters: [{id: 0, val: 0}, {id: 1, val: 1}, {id: 2, val: 0}]};
        const stateAfter = {counters: [{id: 0, val: 0}, {id: 1, val: 0}, {id: 2, val: 0}]};
        const action = decrementCounter(1);

        deepFreeze(stateBefore);
        deepFreeze(action);
        expect(stateAfter).toEqual(postReducer(stateBefore, action));
    });

    /*
     it('action ADD_POST is working', () => {
     const stateBefore = { posts: ['foo'], post: null };
     const stateAfter = { posts: [{
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     cuid: null,
     slug: 'first-post',
     }, 'foo'], post: null };

     const action = {
     type: ActionTypes.ADD_POST,
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     cuid: null,
     slug: 'first-post',
     };
     deepFreeze(stateBefore);
     deepFreeze(action);
     expect(stateAfter).toEqual(postReducer(stateBefore, action));
     });

     it('action ADD_SELECTED_POST is working', () => {
     const stateBefore = {
     posts: [{
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     slug: 'first-post',

     }],
     selectedPost: null,
     };

     const stateAfter = {
     posts: [{
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     slug: 'first-post',
     }],
     post: {
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     slug: 'first-post',
     },
     };

     const action = {
     type: ActionTypes.ADD_SELECTED_POST,
     post: {
     name: 'prank',
     title: 'first post',
     content: 'Hello world!',
     _id: null,
     slug: 'first-post',
     },
     };

     deepFreeze(stateBefore);
     deepFreeze(action);
     expect(stateAfter).toEqual(postReducer(stateBefore, action));
     });
     */
});
