import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';
import {adminDeleteLocation, adminEditLocation} from '../../../../redux/actions/admin/locations.actions';
import moment from 'moment';
import ModalEditDay from '../days/modaledit';
import ModalCreateDay from '../days/modalcreate';

const styles = {
    daysSpan: {
        fontWeight: 400,
        fontSize: 12,
        fontStyle: 'italic',
        color: '#aaa'
    },
    dialogStyles : {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

var ModalEdit = React.createClass({
    getInitialState: function () {
        return {
            location: this.props.location,
            deleteRequested: false,
            tab: 'upcoming',
            selectedDay: null,
            openCreateModal: false
        }
    },
    onRequestDelete: function () {
        console.log('delete requested');
        if (!this.state.deleteRequested) {
            this.setState({deleteRequested: true});
        } else {
            this.props.deleteLocation(this.props.location._id);
            this.props.onRequestClose();
        }
    },
    render: function () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label={this.state.deleteRequested ? "Click to confirm delete" : "Delete"}
                primary={false}
                style={this.state.deleteRequested ? {color:red500} : {}}
                onTouchTap={this.onRequestDelete}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={()=>{
                    this.props.onRequestSubmit(this.state.location);
                    this.props.onRequestClose();
                    }
                }
            />
        ];
        var location = this.state.location;
        var self = this;
        return (
            <Dialog
                title="Edit Location"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                contentStyle={styles.dialogStyles}
            >
                <div style={{marginTop:20}}>
                    <div className="form-group">
                        <label for="id">id</label>
                        <input type="text"
                               className="form-control disabled"
                               value={location._id}
                               readOnly
                               onChange={()=>{}}/>
                    </div>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input
                            className="form-control"
                            value={location.name}
                            onChange={
                            (e)=>{
                                this.setState({
                                    location : {
                                        ...location,
                                        name: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    <div>
                        <label for="days">Days
                            <span style={styles.daysSpan}> days that are available for users to book services</span>
                        </label>
                        <div>
                            <button className="btn btn-xs btn-primary"
                                    style={{marginBottom: 10}}
                                    onClick={()=>{this.setState({openCreateModal: true})}}>
                                + Add Day
                            </button>
                        </div>

                        <ul className="nav nav-tabs" role="tablist">
                            <li role="presentation" className="active">
                                <a href="#upcoming-days"
                                   aria-controls="upcoming"
                                   role="tab"
                                   data-toggle="tab"
                                   onClick={()=>{this.setState({tab: 'upcoming'})}}>
                                    Upcoming</a>
                            </li>
                            <li role="presentation">
                                <a href="#past-days"
                                   aria-controls="past"
                                   role="tab"
                                   data-toggle="tab"
                                   onClick={()=>{this.setState({tab: 'past'})}}>
                                    Past</a>
                            </li>
                        </ul>

                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane fade in active table-responsive"
                                 id="upcoming-days">
                                <table className="table table-condensed table-striped">
                                    <thead>
                                    <tr>
                                        <th><h5>Date</h5></th>
                                        <th><h5>Spots Left</h5></th>
                                        <th><h5>Capacity</h5></th>
                                        <th><h5></h5></th>
                                        <th><h5></h5></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {location.days.map(function (day) {
                                        var timeDiff = moment(day.date).diff(moment());
                                        if (timeDiff < 0) return;
                                        return <tr key={day._id}>
                                            <td>{moment(day.date).format('dddd [-] ll') || 'null'}</td>
                                            <td>{day.capacity-day.eventCount>0 ? day.capacity-day.eventCount : 'full'}</td>
                                            <td>{day.capacity || 'null'}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-xs btn-default"
                                                    onClick={()=>{self.setState({selectedDay:day})}}>
                                                    edit
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div role="tabpanel" className="tab-pane fade table-responsive" id="past-days">
                                <table className="table table-condensed table-striped">
                                    <thead>
                                    <tr>
                                        <th><h5>Date</h5></th>
                                        <th><h5>Spots Left</h5></th>
                                        <th><h5>Capacity</h5></th>
                                        <th><h5></h5></th>
                                        <th><h5></h5></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {location.days.map(function (day) {
                                        var timeDiff = moment(day.date).diff(moment());
                                        if (timeDiff > 0) return;
                                        return <tr key={day._id}>
                                            <td>{moment(day.date).format('dddd [-] ll') || 'null'}</td>
                                            <td>{day.capacity-day.eventCount>0 ? day.capacity-day.eventCount : 'full'}</td>
                                            <td>{day.capacity || 'null'}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-xs btn-default"
                                                    onClick={()=>{self.setState({selectedDay:day})}}>
                                                    edit
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {this.state.selectedDay !== null ?
                        <ModalEditDay
                            day={this.state.selectedDay}
                            open={this.state.selectedDay !== null}
                            onRequestClose={()=>{
                        this.setState({selectedDay : null});
                        }
                    }/> : <div/>}
                    <ModalCreateDay
                        defaultLocationId = {location._id}
                        open = {this.state.openCreateModal}
                        onRequestClose={()=>{
                        this.setState({openCreateModal: false});
                    }}
                    />
                </div>
            </Dialog>
        );
    }
});

ModalEdit.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestSubmit: React.PropTypes.func.isRequired,
    deleteLocation: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        location: ownProps.location || {}
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteLocation: (id) => {
            dispatch(adminDeleteLocation(id));
        },
        onRequestSubmit: (location) => {
            dispatch(adminEditLocation(location));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);