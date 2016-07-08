import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../components/product/loadingspinner';
import { adminGetLocations } from '../../../../redux/actions/admin/locations.actions';
import {adminGetWorkplaces, adminWorkplaceSetSnackbarMessage} from '../../../../redux/actions/admin/workplaces.actions';
import Snackbar from 'material-ui/Snackbar';
import ModalCreate from './modalcreate';
import ModalEdit from './modaledit';


var WorkplacesPage = React.createClass({
    getInitialState: function () {
        return {
            selectedWorkplace: null,
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
                <h2 className="dashboard-title">Workplaces</h2>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
                <button
                    className="btn btn-primary"
                    style={{marginBottom:20}}
                    onClick={()=>{
                        this.setState({openCreateModal: true});
                        }
                    }>
                    + Add Workplace
                </button>
                <Paper>
                    <div className="container-fluid table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th><h4>Name</h4></th>
                                <th><h4>id</h4></th>
                                <th><h4>location name</h4></th>
                                <th><h4></h4></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.workplaces.map(function (workplace) {
                                return <tr
                                    key={workplace._id}>
                                    <td>{workplace.name}</td>
                                    <td>{workplace._id}</td>
                                    <td style={workplace.location.name ? {} : {color:'#CCC'}}>
                                        {workplace.location.name || 'null'}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-default"
                                            onClick={()=>{
                                                self.setState({selectedWorkplace: workplace});
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
                {this.state.selectedWorkplace !== null ?
                    <ModalEdit
                        workplace={this.state.selectedWorkplace}
                        open={this.state.selectedWorkplace !== null}
                        onRequestClose={()=>{
                        this.setState({selectedWorkplace : null});
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

WorkplacesPage.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    workplaces: React.PropTypes.array.isRequired,
    message: React.PropTypes.string.isRequired,
    loadData: React.PropTypes.func.isRequired,
    clearMessage: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.admin.workplaces.isLoading || state.admin.locations.isLoading || false,
        workplaces: state.admin.workplaces.objects || [],
        message: state.admin.workplaces.message || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => {
            dispatch(adminGetWorkplaces());
            dispatch(adminGetLocations());
        },
        clearMessage: () => {
            dispatch(adminWorkplaceSetSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkplacesPage);