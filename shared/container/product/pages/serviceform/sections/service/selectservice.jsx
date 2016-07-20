import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {
    getAvailableServices,
    removeServiceIdByIndex,
    setServiceIdByIndex
} from '../../../../../../redux/actions/product/serviceform/services.actions';
import IconButton from 'material-ui/IconButton'
import RemoveIcon from 'material-ui/svg-icons/action/delete'
import {red200, greenA400} from 'material-ui/styles/colors';
import ServiceTabs from './servicetabs';
import FlatButton from 'material-ui/FlatButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';


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
            minWidth: 40
        },
        icon: {
            fill: '#aaa',
            color: '#aaa'
        }
    }
}

var SelectService = React.createClass({
    componentDidMount: function () {
        this.props.getAvailableServices();
    },
    removeHandler: function () {
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
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xs-10">
                                    <h4>Select a service {selected_service_id !== '' ? <CheckCircle style={{fill:greenA400}}/>: ''}</h4>
                                </div>
                                <div className="col-xs-2"
                                     style={styles.removeButton.col}>
                                    <FlatButton
                                        style={styles.removeButton.button}
                                        onTouchTap={this.removeHandler}
                                        icon={<RemoveIcon color={'#aaa'}/>}>
                                    </FlatButton>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <ServiceTabs
                                        serviceId={selected_service_id}
                                        setServiceId={(id)=>{this.props.setServiceIdByIndex(this.props.idx, id)}}
                                        availableServices={this.props.availableServices.filter(
                                            (service)=>{
                                                return service.workplace_id === selected_workplace_id;
                                            }
                                        )}
                                    />
                                </div>
                            </div>
                            {selected_service_id !== '' ?
                                <FlatButton label="reset" onTouchTap={()=>{this.selectHandler('')}}/> :
                                ''
                            }
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