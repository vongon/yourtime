import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { formSetVehicle, formSetVehicleErrorText } from '../../../redux/actions/serviceform.actions';

var ModalVehicle = React.createClass({
    onVehicleChange:
        function(model, make, year){
            if(model === null) model = this.props.model;
            if(make === null) make = this.props.make;
            if(year === null) year = this.props.year;
            if(model === '' && make === '' && year === ''){
                this.props.setVehicle({});
            } else {
                this.props.setVehicle({
                    model:model,
                    make: make,
                    year: year
                });
            }
            this.props.setVehicleErrorText('');
    },
    render: function () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onRequestClose}
            />,
        ];
        return (
            <Dialog
                title="What type of vehicle do you drive?"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div className="container-fluid">
                    <TextField
                        value={this.props.model}
                        fullWidth={true}
                        onChange={(e,txt)=>{this.onVehicleChange(txt,null,null)}}
                        hintText="Toyota, Nissan, Honda, etc.."
                        floatingLabelText="Make"
                    />
                    <TextField
                        value={this.props.make}
                        fullWidth={true}
                        onChange={(e,txt)=>{this.onVehicleChange(null,txt,null)}}
                        hintText="Corolla, Sentra, Civic, etc..."
                        floatingLabelText="Model"
                    />
                    <TextField
                        value={this.props.year}
                        fullWidth={true}
                        onChange={(e,txt)=>{this.onVehicleChange(null,null,txt)}}
                        hintText="2016, 2011, 1970, etc..."
                        floatingLabelText="Year"
                    />
                </div>
            </Dialog>
        );
    }
});

ModalVehicle.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    model: React.PropTypes.string.isRequired,
    make: React.PropTypes.string.isRequired,
    year: React.PropTypes.string.isRequired,
    setVehicle: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        model: state.serviceform.body.vehicle.model || '',
        make: state.serviceform.body.vehicle.make || '',
        year: state.serviceform.body.vehicle.year || '',
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setVehicle: (vehicle) => {
            dispatch(formSetVehicle(vehicle))
        },
        setVehicleErrorText: (text) => {
            dispatch(formSetVehicleErrorText(text));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalVehicle);