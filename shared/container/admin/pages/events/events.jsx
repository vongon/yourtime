import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../components/product/loadingspinner';
import { adminGetEvents, adminEventSetSnackbarMessage } from '../../../../redux/actions/admin/events.actions';
import Snackbar from 'material-ui/Snackbar';

var EventsPage = React.createClass({
    getInitialState: function () {
        return {
            selectedEvent: null,
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
                <h2 className="dashboard-title">Events</h2>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
                {/*<button
                    className="btn btn-primary"
                    style={{marginBottom:20}}
                    onClick={()=>{
                        this.setState({openCreateModal: true});
                        }
                    }>
                    + Add Event
                </button>*/}
                <Paper>
                    <div className="container-fluid table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th><h4>UserId</h4></th>
                                <th><h4>Workplace</h4></th>
                                <th><h4>VehicleId</h4></th>
                                <th><h4># of Services</h4></th>
                                <th><h4>Date</h4></th>
                                <th><h4></h4></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.events.map(function (event) {
                                return <tr
                                    key={event._id}>
                                    <td>{event.user_id}</td>
                                    <td style={event.workplace.name ? {} : {color:'#CCC'}}
                                    >{event.workplace.name || 'null'}</td>
                                    <td>{event.vehicle_id}</td>
                                    <td>{event.services.length}</td>
                                    <td>{event.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-default"
                                            onClick={()=>{
                                                self.setState({selectedEvent: event});
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
                {/*this.state.selectedEvent !== null ?
                    <ModalEdit
                        event={this.state.selectedEvent}
                        open={this.state.selectedEvent !== null}
                        onRequestClose={()=>{
                        this.setState({selectedEvent : null});
                        }
                    }/> : <div/>*/}
                {/*<ModalCreate
                    open = {this.state.openCreateModal}
                    onRequestClose={()=>{
                        this.setState({openCreateModal: false});
                    }}
                />*/}
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

EventsPage.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    events: React.PropTypes.array.isRequired,
    message: React.PropTypes.string.isRequired,
    loadData: React.PropTypes.func.isRequired,
    clearMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.admin.events.isLoading || state.admin.workplaces.isLoading || false,
        events: state.admin.events.objects || [],
        message: state.admin.events.message || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => {
            dispatch(adminGetEvents());
        },
        clearMessage: () => {
            dispatch(adminEventSetSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);