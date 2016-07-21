import * as ActionTypes from '../../constants/constants';
import { setWorkplaceId } from './serviceform/workplaces.actions';
import { setVehicleId, setShowCreateView, resetCreateVehicleForm, setAvailableVehicles } from './serviceform/vehicles.actions';
import { setServices } from './serviceform/services.actions';
import { setDate } from './serviceform/dates.actions';
import { setSubmitSuccess } from './serviceform/overview.actions';


export function setSnackbarMessage(message){
    return {
        type: ActionTypes.PRODUCT_GLOBAL_SET_SNACKBAR_MESSAGE,
        message: message
    };
}

export function resetServiceForm() {
    return (dispatch, getState) => {
        dispatch(setWorkplaceId(null));
        dispatch(setVehicleId(null));
        dispatch(setShowCreateView(false));
        dispatch(setServices(['']));
        dispatch(setDate(null));
        dispatch(setSubmitSuccess(false));
        dispatch(resetCreateVehicleForm());
        
        var availableVehicles = getState().product.serviceform.ui.selectvehicle.availableVehicles;
        var filteredVehicles = availableVehicles.filter((vehicle)=>{
            return vehicle._id !== 'new';
        });
        dispatch(setAvailableVehicles(filteredVehicles));
    }
}