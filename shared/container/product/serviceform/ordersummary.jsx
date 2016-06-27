import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import { formSetStep, formReset, formSubmit } from '../../../redux/actions/serviceform.actions';
import moment from 'moment';

var OrderSummary = React.createClass({
    stringifyVehicle: function(selectedVehicle){
        if($.isEmptyObject(selectedVehicle)){
            return '';
        } else {
            return selectedVehicle.model + ' ' + selectedVehicle.make + ' ' + selectedVehicle.year + ' ';
        }
    },
    onSubmit: function() {
        this.props.formSubmit();
    },
    render: function () {
        return (
            <div>
                <h3>Okay let's book this!</h3>
                <Divider />
                <TextField
                    disabled={true}
                    fullWidth={true}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    floatingLabelText="Service"
                    hintText="no service specified"
                    defaultValue={this.props.body.service.name}
                />
                <TextField
                    disabled={true}
                    fullWidth={true}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    floatingLabelText="Date"
                    hintText="no date specified"
                    defaultValue={moment(this.props.body.date).format('MMMM Do YYYY')}
                />
                <TextField
                    disabled={true}
                    fullWidth={true}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    floatingLabelText="Vehicle"
                    hintText="no vehicle specified"
                    defaultValue={this.stringifyVehicle(this.props.body.vehicle)}
                />
                <TextField
                    disabled={true}
                    fullWidth={true}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    floatingLabelText="Workplace"
                    hintText="no workplace specified"
                    defaultValue={this.props.body.workplace.name}
                />
                <TextField
                    disabled={true}
                    fullWidth={true}
                    underlineShow={false}
                    floatingLabelFixed={true}
                    floatingLabelText="Total"
                    hintText="no total specified"
                    defaultValue={'$'+String(this.props.body.service.price)}
                />
                <Divider />

                <RaisedButton
                    label={'Order & Pay'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.onSubmit}
                    style={{marginRight: 12, marginTop: 12}}
                />
                <FlatButton
                    label="Back"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onTouchTap={()=>{this.props.setStep('chooseService')}}
                />
            </div>
        );
    }
});

OrderSummary.propTypes = {
    body: React.PropTypes.object.isRequired,
    setStep: React.PropTypes.func.isRequired,
    formReset: React.PropTypes.func.isRequired,
    formSubmit: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        body : state.serviceform.body
    };
}

function mapDispatchToProps(dispatch){
    return {
        setStep: (stepName) => {
            dispatch(formSetStep(stepName));
        },
        formReset: () => {
            dispatch(formReset());
        },
        formSubmit: () => {
            dispatch(formSubmit());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);