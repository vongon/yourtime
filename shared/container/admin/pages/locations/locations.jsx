import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../components/product/loadingspinner';
import {adminGetLocations, adminLocationSetSnackbarMessage} from '../../../../redux/actions/admin/locations.actions';
import ModalEdit from './modaledit';
import ModalCreate from './modalcreate';
import Snackbar from 'material-ui/Snackbar';


var LocationsPage = React.createClass({
    getInitialState: function () {
        return {
            selectedLocation: null,
            openCreateModal: false
        }
    },
    componentDidMount: function () {
        this.props.getLocations();
    },
    render: function () {
        if (this.props.isLoading) {
            return (<Paper style={{marginTop:20}} zDepth={1}><LoadingSpinner/></Paper>);
        }
        var self = this;
        return (
            <div>
                <h2 className="dashboard-title">Locations</h2>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
                <button
                    className="btn btn-primary"
                    style={{marginBottom:20}}
                    onClick={()=>{
                        this.setState({openCreateModal: true});
                        }
                    }>
                    + Add Location
                </button>
                <Paper>
                    <div className="container-fluid table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th><h4>Name</h4></th>
                                <th><h4>id</h4></th>
                                <th><h4># of days</h4></th>
                                <th><h4></h4></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.locations.map(function (location) {
                                return <tr
                                    key={location._id}>
                                    <td>{location.name}</td>
                                    <td>{location._id}</td>
                                    <td>{location.days.length}</td>
                                    <td>
                                        <button
                                            className="btn btn-default"
                                            onClick={()=>{
                                                self.setState({selectedLocation: location});
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
                {this.state.selectedLocation !== null ?
                    <ModalEdit
                    location={this.state.selectedLocation}
                    open={this.state.selectedLocation !== null}
                    onRequestClose={()=>{
                        this.setState({selectedLocation : null});
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

LocationsPage.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    locations: React.PropTypes.array.isRequired,
    message: React.PropTypes.string.isRequired,
    getLocations: React.PropTypes.func.isRequired,
    clearMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.admin.locations.isLoading || false,
        locations: state.admin.locations.objects || [],
        message: state.admin.locations.message || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLocations: () => {
            dispatch(adminGetLocations());
        },
        clearMessage: () => {
            dispatch(adminLocationSetSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsPage);