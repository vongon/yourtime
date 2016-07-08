import { combineReducers } from 'redux';
import LocationsReducer from './locations.reducer';
import WorkplacesReducer from './workplaces.reducer';
import ServicesReducer from './services.reducer';
import EventsReducer from './events.reducer';

export default combineReducers({
    locations: LocationsReducer,
    workplaces: WorkplacesReducer,
    services: ServicesReducer,
    events: EventsReducer
});