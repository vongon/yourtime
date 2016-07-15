import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {
    getAvailableServices,
    removeServiceIdByIndex,
    setServiceIdByIndex
} from '../../../../../../redux/actions/product/serviceform/services.actions';
import dots from 'dots';
import IconButton from 'material-ui/IconButton'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import {red200} from 'material-ui/styles/colors';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    row: {
        cursor: 'pointer'
    },
    selectedRow: {
        cursor: 'pointer',
        backgroundColor: '#eee'
    },
    removeButton: {
        col: {
            textAlign: 'right'
        },
        button: {
            margin: 0,
            padding: 0,
            width: 24,
            height: 24
        },
        icon: {
            fill: red200
        }
    }
}

var SelectService = React.createClass({
    componentDidMount: function () {
        this.props.getAvailableServices();
    },
    removeHandler: function(){
        console.log('remove');
        this.props.removeService(this.props.idx);
    },
    selectHandler: function (service) {
        this.props.setServiceIdByIndex(this.props.idx, service._id);
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
        var selected_workplace_id = this.props.selected_workplace_id;
        var selected_service_id = this.props.selected_service_id;
        var self = this;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-10">
                                    <h4>Select a service</h4>
                                </div>
                                <div className="col-xs-2"
                                     style={styles.removeButton.col}>
                                    <IconButton
                                        style={styles.removeButton.button}
                                        iconStyle={styles.removeButton.icon}
                                        onTouchTap={this.removeHandler}>
                                        <RemoveCircle/>
                                    </IconButton>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th><h5>Name</h5></th>
                                        <th><h5>Category</h5></th>
                                        <th><h5>Description</h5></th>
                                        <th><h5>Price</h5></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.availableServices.map(function (service) {
                                        if (service.workplace_id !== selected_workplace_id) {
                                            return null;
                                        }
                                        console.log('selected id:', selected_service_id);
                                        console.log('service id:', service._id);
                                        return <tr
                                            style={selected_service_id === service._id ? styles.selectedRow : styles.row}
                                            onClick={()=>{self.selectHandler(service)}}
                                            key={service._id}>
                                            <td>{service.name}</td>
                                            <td>{service.category}</td>
                                            <td>{dots(service.description, 14)}</td>
                                            <td>{'$ ' + service.price}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

SelectService.propTypes = {
    idx: React.PropTypes.number.isRequired,
    selected_service_id: React.PropTypes.string.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    availableServices: React.PropTypes.array.isRequired,
    getAvailableServices: React.PropTypes.func.isRequired,
    selected_workplace_id: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        idx: ownProps.idx || 0,
        selected_service_id: ownProps.service_id || '',
        isLoading: state.product.serviceform.ui.selectservice.isLoading || false,
        visible: ownProps.visible,
        availableServices: state.product.serviceform.ui.selectservice.availableServices || [],
        selected_workplace_id: state.product.serviceform.body.workplace_id || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAvailableServices: ()=> {
            dispatch(getAvailableServices());
        },
        setServiceIdByIndex(idx, id){
            dispatch(setServiceIdByIndex(idx, id));
        },
        removeService(idx){
            dispatch(removeServiceIdByIndex(idx));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectService);