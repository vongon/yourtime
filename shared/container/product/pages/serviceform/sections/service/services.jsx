import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {addServiceId} from '../../../../../../redux/actions/product/serviceform/services.actions';
import SelectService from './selectservice';

const styles = {
    col: {
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
};

var Services = React.createClass({
    onAddService: function () {
        console.log('add new service');
        this.props.addServiceId('');
    },
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        var services = this.props.selectedServices;
        var disableAddButton = (services[ services.length-1 ]||'')===''; //enabled if the last service has been selected
        disableAddButton = disableAddButton && services.length !== 0; //and if the services list is not empty
        return (
            <div>
                {this.props.selectedServices.map(
                    function (service_id, idx) {
                        console.log('id:', service_id);
                        console.log('idx:', idx);
                        return <SelectService
                            key={service_id+idx}
                            visible={true}
                            idx={idx}
                            service_id={service_id}
                        />;
                    })
                }
                <div className="row">
                    <div className="col-sm-12" style={styles.col}>
                        <RaisedButton
                            style={styles.button}
                            label="+ Add Service"
                            secondary={true}
                            onTouchTap={this.onAddService}
                            disabled={disableAddButton}
                        />
                    </div>
                </div>

            </div>
        );
    }
});

Services.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    selectedServices: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        visible: ownProps.visible,
        selectedServices: state.product.serviceform.body.services || []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addServiceId: (id)=>{
            dispatch(addServiceId(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);