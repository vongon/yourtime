import React from 'react';
import {connect} from 'react-redux';
import SelectWorkplace from './sections/workplace/selectworkplace';
import SelectVehicle from './sections/vehicle/selectvehicle';
import Services from './sections/service/services';
import SelectDate from './sections/date/selectdate';
import Divider from 'material-ui/Divider';
import Submit from './sections/submit/submit';
import FlatButton from 'material-ui/FlatButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import { resetServiceForm } from '../../../../redux/actions/product/global.actions';

var ServiceFormIndex = React.createClass({
    render: function () {
        console.log('this.props.date:', this.props.date);
        return (
            <div>
                <h3
                    style={{marginBottom: 0}}
                >SERVICE FORM
                    <FlatButton
                        onTouchTap={this.props.resetForm}
                        label="reset"
                        icon={<Refresh/>}
                        style={{minWidth:36, marginLeft:10}}
                    />
                </h3>
                <SelectWorkplace />
                <SelectVehicle
                    visible={this.props.workplace_id !== ''}
                />
                <Services
                    visible={this.props.workplace_id !== '' && this.props.vehicle_id !== ''}
                />
                <SelectDate
                    visible={this.props.workplace_id !== '' &&
                            this.props.vehicle_id !== '' &&
                            this.props.services[0]||'' !== ''}
                />
                <Submit
                    visible={this.props.workplace_id !== '' &&
                            this.props.vehicle_id !== '' &&
                            (this.props.services[0]||'' !== '') &&
                            this.props.date !== ''}
                />
                <Divider
                    style={{marginTop:20, marginBottom:20}}
                />


            </div>
        );
    }
});

ServiceFormIndex.propTypes = {
    lock: React.PropTypes.object.isRequired,
    workplace_id: React.PropTypes.string.isRequired,
    vehicle_id: React.PropTypes.string.isRequired,
    services: React.PropTypes.array.isRequired,
    date: React.PropTypes.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        workplace_id: state.product.serviceform.body.workplace_id || '',
        vehicle_id: state.product.serviceform.body.vehicle_id || '',
        services: state.product.serviceform.body.services || [],
        date: state.product.serviceform.body.date || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetForm: () => {
            dispatch(resetServiceForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormIndex);