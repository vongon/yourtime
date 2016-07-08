import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../components/product/loadingspinner';
import { adminGetServices, adminServiceSetSnackbarMessage } from '../../../../redux/actions/admin/services.actions';
import { adminGetWorkplaces } from '../../../../redux/actions/admin/workplaces.actions';
import dots from 'dots';
import Snackbar from 'material-ui/Snackbar';
import ModalCreate from './modalcreate';
import ModalEdit from './modaledit';

var ServicesPage = React.createClass({
    getInitialState: function () {
        return {
            selectedService: null,
            openCreateModal: false
        }
    },
    componentDidMount: function () {
        this.props.loadData();
    },
    render: function () {
        if (this.props.isLoading) {
            return (<Paper style={{marginTop:20}} zDepth={1}><LoadingSpinner/></Paper>);
        }
        var self = this;
        return (
            <div>
                <h2 className="dashboard-title">Services</h2>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
                <button
                    className="btn btn-primary"
                    style={{marginBottom:20}}
                    onClick={()=>{
                        this.setState({openCreateModal: true});
                        }
                    }>
                    + Add Service
                </button>
                <Paper>
                    <div className="container-fluid table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th><h4>Name</h4></th>
                                <th><h4>Type</h4></th>
                                <th><h4>Category</h4></th>
                                <th><h4>Description</h4></th>
                                <th><h4>Price</h4></th>
                                <th><h4>Workplace name</h4></th>
                                <th><h4></h4></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.services.map(function (service) {
                                return <tr
                                    key={service._id}>
                                    <td>{service.name}</td>
                                    <td>{service.type}</td>
                                    <td>{service.category}</td>
                                    <td>{dots(service.description, 14)}</td>
                                    <td>{'$ '+service.price}</td>
                                    <td style={service.workplace.name ? {} : {color:'#CCC'}}>
                                        {service.workplace.name || 'null'}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-default"
                                            onClick={()=>{
                                                self.setState({selectedService: service});
                                                }
                                            }>
                                            edit
                                        </button>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </Paper>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
                {this.state.selectedService !== null ?
                    <ModalEdit
                        service={this.state.selectedService}
                        open={this.state.selectedService !== null}
                        onRequestClose={()=>{
                        this.setState({selectedService : null});
                        }
                    }/> : <div/>}
                <ModalCreate
                    open = {this.state.openCreateModal}
                    onRequestClose={()=>{
                        this.setState({openCreateModal: false});
                    }}
                />
                <Snackbar
                    open={this.props.message !== ''}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.props.clearMessage}
                />
            </div>
        );
    }
});

ServicesPage.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    services: React.PropTypes.array.isRequired,
    message: React.PropTypes.string.isRequired,
    loadData: React.PropTypes.func.isRequired,
    clearMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.admin.services.isLoading || state.admin.workplaces.isLoading || false,
        services: state.admin.services.objects || [],
        message: state.admin.services.message || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => {
            dispatch(adminGetServices());
            dispatch(adminGetWorkplaces());
        },
        clearMessage: () => {
            dispatch(adminServiceSetSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);