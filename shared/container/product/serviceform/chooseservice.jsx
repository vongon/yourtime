import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import TextField from 'material-ui/TextField';
import ModalServices from './modalservices';
import ModalVehicle from './modalvehicle';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
    formSetServicesModal,
    formSetVehicleModal,
    formSetStep,
    formSetServiceErrorText,
    formSetVehicleErrorText,
    formSetDateErrorText,
    formSetDate
} from '../../../redux/actions/serviceform.actions';


var ChooseServices = React.createClass({
    onRequestNext: function () {
        var validated = true;
        if ($.isEmptyObject(this.props.selectedService)) {
            validated = false;
            this.props.setServiceErrorText('please select a service')
        }
        if ($.isEmptyObject(this.props.selectedVehicle)) {
            validated = false;
            this.props.setVehicleErrorText('please enter your vehicle info')
        }
        if (typeof this.props.selectedDate.getMonth !== 'function') {
            validated = false;
            this.props.setDateErrorText('please enter a date')
        }
        if (validated) this.props.setStep('orderSummary');
    },
    stringifyService: function () {
        var selectedService = this.props.selectedService;
        if ($.isEmptyObject(selectedService)) {
            return '';
        } else if (selectedService.name && selectedService.price) {
            return selectedService.name + ' - $' + selectedService.price;
        } else {
            console.assert(false, 'invalid service object passed to ChooseServices, needs a name and price property');
        }
    },
    stringifyVehicle: function () {
        var selectedVehicle = this.props.selectedVehicle;
        if ($.isEmptyObject(selectedVehicle)) {
            return '';
        } else {
            return selectedVehicle.model + ' ' + selectedVehicle.make + ' ' + selectedVehicle.year + ' ';
        }
    },
    render: function () {
        return (
            <div className="container-fluid" style={{boxSizing:'content-box'}}>
                <div className="row">
                    <div className="col-sm-12">
                        <h4 style={{marginTop: 20}}>Great! What auto service do you need completed?</h4>
                        <TextField
                            hintText="Choose a service"
                            style={{width: '100%'}}
                            floatingLabelText="Service:"
                            floatingLabelFixed={true}
                            value={this.stringifyService()}
                            onTouchTap={()=>{this.props.setServicesModal(true)}}
                            errorText={this.props.serviceErrorText}
                        />
                        <TextField
                            hintText="Vehicle information"
                            style={{width: '100%'}}
                            floatingLabelText="Vehicle:"
                            floatingLabelFixed={true}
                            value={this.stringifyVehicle()}
                            onTouchTap={()=>{this.props.setVehicleModal(true)}}
                            errorText={this.props.vehicleErrorText}
                        />
                        <DatePicker
                            onChange={
                                (null_arg,date)=>{
                                    this.props.setDate(date);
                                    this.props.setDateErrorText('');
                                }
                            }
                            value={this.props.selectedDate}
                            hintText="Select a Date"
                            floatingLabelText="Date:"
                            floatingLabelFixed={true}
                            textFieldStyle={{width: '100%'}}
                            errorText={this.props.dateErrorText}
                            shouldDisableDate={
                                (date)=>{
                                    var selectedWorkplace = this.props.selectedWorkplace;
                                    if(date < new Date()) return true;
                                    if(date.getDay() !== selectedWorkplace.day_of_week) return true;
                                }
                            }
                        />

                        <RaisedButton
                            label="Next"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            primary={true}
                            onTouchTap={this.onRequestNext}
                            style={{marginRight: 12}}/>
                        <FlatButton
                            label="Back"
                            disableTouchRipple={true}
                            disableFocusRipple={true}
                            onTouchTap={()=>{this.props.setStep('chooseWorkplace')}}
                        />

                        <ModalServices
                            open={this.props.servicesModal}
                            onRequestClose={()=>{this.props.setServicesModal(false)}}
                        />
                        <ModalVehicle
                            open={this.props.vehicleModal}
                            onRequestClose={()=>{this.props.setVehicleModal(false)}}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

ChooseServices.propTypes = {
    servicesModal: React.PropTypes.bool.isRequired,
    vehicleModal: React.PropTypes.bool.isRequired,

    selectedWorkplace: React.PropTypes.object.isRequired,
    selectedService: React.PropTypes.object.isRequired,
    selectedVehicle: React.PropTypes.object.isRequired,
    selectedDate: React.PropTypes.object.isRequired,

    setDate: React.PropTypes.func.isRequired,

    serviceErrorText: React.PropTypes.string.isRequired,
    vehicleErrorText: React.PropTypes.string.isRequired,
    dateErrorText: React.PropTypes.string.isRequired,

    setServiceErrorText: React.PropTypes.func.isRequired,
    setVehicleErrorText: React.PropTypes.func.isRequired,
    setDateErrorText: React.PropTypes.func.isRequired,

    setStep: React.PropTypes.func.isRequired,
    setServicesModal: React.PropTypes.func.isRequired,
    setVehicleModal: React.PropTypes.func.isRequired,

};

function mapStateToProps(state, ownProps) {
    return {
        servicesModal: state.serviceform.ui.servicesModal || false,
        vehicleModal: state.serviceform.ui.vehicleModal || false,

        selectedWorkplace: state.serviceform.body.workplace || {},
        selectedService: state.serviceform.body.service || {},
        selectedVehicle: state.serviceform.body.vehicle || {},
        selectedDate: state.serviceform.body.date || {},

        serviceErrorText: state.serviceform.ui.serviceErrorText || '',
        vehicleErrorText: state.serviceform.ui.vehicleErrorText || '',
        dateErrorText: state.serviceform.ui.dateErrorText || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setServiceErrorText: (text) => {
            dispatch(formSetServiceErrorText(text));
        },
        setVehicleErrorText: (text) => {
            dispatch(formSetVehicleErrorText(text));
        },
        setDateErrorText: (text) => {
            dispatch(formSetDateErrorText(text));
        },
        setStep: (stepName) => {
            dispatch(formSetStep(stepName));
        },
        setServicesModal: (bool) => {
            dispatch(formSetServicesModal(bool));
        },
        setVehicleModal: (bool) => {
            dispatch(formSetVehicleModal(bool));
        },
        setDate: (dateObj) => {
            dispatch(formSetDate(dateObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseServices);