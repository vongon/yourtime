import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {getAvailableVehicles, setVehicleId} from '../../../../../../redux/actions/product/serviceform/vehicles.actions';

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
    getInitialState: function () {
        return {
            showCreateView: false
        }
    },
    componentDidMount: function () {
        this.props.getAvailableVehicles();
    },
    handleChange: function (e, index, selected_value) {
        if (selected_value === 'create') {
            this.setState({showCreateView: true});
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
                            <h4>Select a vehicle</h4>
                            <div style={styles.selectFieldContainer}>
                                <SelectField
                                    value={this.props.vehicle_id}
                                    onChange={this.handleChange}
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
    vehicle_id: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.product.serviceform.ui.selectvehicle.isLoading || false,
        visible: ownProps.visible,
        availableVehicles: state.product.serviceform.ui.selectvehicle.availableVehicles || [],
        vehicle_id: state.product.serviceform.body.vehicle_id || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAvailableVehicles: ()=> {
            dispatch(getAvailableVehicles());
        },
        setVehicleId: (id)=> {
            dispatch(setVehicleId(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectVehicle);