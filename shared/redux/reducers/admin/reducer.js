import { combineReducers } from 'redux';
import LocationsReducer from './locations.reducer';
import WorkplacesReducer from './workplaces.reducer';
import ServicesReducer from './services.reducer';
import EventsReducer from './events.reducer';
import DaysReducer  from './days.reducer';

export default combineReducers({
    locations: LocationsReducer,
    workplaces: WorkplacesReducer,
    services: ServicesReducer,
    days: DaysReducer,
    events: EventsReducer
});