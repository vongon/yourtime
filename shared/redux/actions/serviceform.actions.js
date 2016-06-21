import * as ActionTypes from '../constants/constants';


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

export function formSetLoading(bool) {
    return {
        type: ActionTypes.FORM_SET_LOADING,
        bool: bool
    };
}

export function formSetAvailableServicesAndStep(availableServices, stepName){
    return {
        type: ActionTypes.FORM_SET_AVAILABLE_SERVICES_AND_STEP,
        availableServices: availableServices,
        stepName: stepName
    }
}

export function formSetService(service){
    return {
        type: ActionTypes.FORM_SET_SERVICE,
        service: service
    };
}


export function formAsyncSetWorkplace(workplace) {
    //sets workplace to current selection
    //sets isLoading to True
    //requests services for selected workplace, and then updates services,step,and loading in state 
    return (dispatch, getState) => {
        dispatch( formSetLoading(true) );
        dispatch( formSetWorkplace(workplace) );
        setTimeout(function(){
            dispatch( formSetLoading(false) );
            var services = [{'service': 'oil change'}, {'service': 'tire rotation'}, {'services':'brake check'}]; //dummy data
            dispatch( formSetAvailableServicesAndStep(services, 'chooseService') );
        }, 2000); //emulate async
    }
}

export function formAsyncSetService(service) {
    return (dispatch, getState) => {
        dispatch( formSetLoading(true) );
        dispatch( formSetService(service) );
        setTimeout(function(){
            dispatch( formSetLoading(false) );
            dispatch( formSetStep('chooseDate'));
        }, 2000);
    }
}