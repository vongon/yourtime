import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {getAvailableVehicles, setVehicleId, setShowCreateView} from '../../../../../../redux/actions/product/serviceform/vehicles.actions';
import CreateVehicle from './createvehicle';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {greenA400} from 'material-ui/styles/colors';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    selectFieldContainer: {
        textAlign: 'center'
    },
    selectField: {
        marginBottom: 10
    }
}

var SelectVehicle = React.createClass({
    componentDidMount: function () {
        this.props.getAvailableVehicles();
    },
    handleChange: function (e, index, selected_value) {
        if (selected_value === 'create') {
            this.props.setShowCreateView(true);
            return;
        }
        this.props.setVehicleId(selected_value);
    },
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        if (this.props.isLoading) {
            return (<div className="row">
                <div className="col-sm-12"><Paper style={styles.paper}><LoadingSpinner/></Paper></div>
            </div>);
        }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <h4>Select a vehicle {this.props.vehicle_id !== '' ? <CheckCircle style={{fill:greenA400}}/>: ''}</h4>
                            {this.props.showCreateView ? null :
                                <div style={styles.selectFieldContainer}>
                                    <SelectField
                                        value={this.props.vehicle_id}
                                        onChange={this.handleChange}
                                        fullWidth={true}
                                        style={styles.selectField}
                                    >
                                        <MenuItem value={''} primaryText="Select A Vehicle" disabled={true}/>
                                        {this.props.availableVehicles.map(function (vehicle) {
                                            return <MenuItem key={vehicle._id} value={vehicle._id}
                                                             primaryText={vehicle.name}/>
                                        })}
                                        <MenuItem value={'create'} primaryText="Create a new vehicle"/>
                                    </SelectField>
                                </div>
                            }
                            <CreateVehicle
                                visible={this.props.showCreateView}
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

SelectVehicle.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    availableVehicles: React.PropTypes.array.isRequired,
    vehicle_id: React.PropTypes.string.isRequired,
    showCreateView: React.PropTypes.bool.isRequired,

    getAvailableVehicles: React.PropTypes.func.isRequired,
    setVehicleId: React.PropTypes.func.isRequired,
    setShowCreateView: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.product.serviceform.ui.selectvehicle.isLoading || false,
        visible: ownProps.visible,
        availableVehicles: state.product.serviceform.ui.selectvehicle.availableVehicles || [],
        vehicle_id: state.product.serviceform.body.vehicle_id || '',
        showCreateView: state.product.serviceform.ui.selectvehicle.showCreateView || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAvailableVehicles: ()=> {
            dispatch(getAvailableVehicles());
        },
        setVehicleId: (id)=> {
            dispatch(setVehicleId(id));
        },
        setShowCreateView: (bool)=>{
            dispatch(setVehicleId(null));
            dispatch(setShowCreateView(bool));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectVehicle);