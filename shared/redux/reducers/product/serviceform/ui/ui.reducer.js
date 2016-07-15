import { combineReducers } from 'redux';
import SelectworkplaceReducer from './selectworkplace.reducer';
import SelectVehicleReducer from './selectvehicle.reducer';
import SelectServiceReducer from './selectservice.reducer';
import SelectDateReducer from './selectdate.reducer';
import OverviewReducer from './overview.reducer';

export default combineReducers({
    selectworkplace: SelectworkplaceReducer,
    selectvehicle: SelectVehicleReducer,
    selectservice: SelectServiceReducer,
    selectdate: SelectDateReducer,
    overview: OverviewReducer
});