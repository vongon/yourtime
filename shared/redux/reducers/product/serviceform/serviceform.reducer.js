import { combineReducers } from 'redux';
import BodyReducer from './body.reducer';
import UiReducer from './ui/ui.reducer';


export default combineReducers({
    ui: UiReducer,
    body: BodyReducer
});