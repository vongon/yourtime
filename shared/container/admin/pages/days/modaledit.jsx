import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors'
import { adminDeleteDay, adminEditDay } from '../../../../redux/actions/admin/days.actions'


var ModalEdit = React.createClass({
    getInitialState: function () {
        return {
            day: {...this.props.day, date: new Date(this.props.day.date)},
            deleteRequested: false,
        }
    },
    onRequestDelete: function () {
        console.log('delete requested');
        if (!this.state.deleteRequested) {
            this.setState({deleteRequested: true});
        } else {
            this.props.deleteDay(this.props.day._id);
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
                    this.props.onRequestSubmit(this.state.day);
                    this.props.onRequestClose();
                    }
                }
            />
        ];
        var day = this.state.day;
        return (
            <Dialog
                title="Edit Day"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
                    <div className="form-group">
                        <label for="id">id</label>
                        <input type="text"
                               className="form-control disabled"
                               value={day._id}
                               readOnly
                               onChange={()=>{}}/>
                    </div>
                    <div className="form-group">
                        <label for="name">Date</label>
                        <DatePicker
                            hintText="Pick a date"
                            value={day.date}
                            onChange={(err, date)=>{
                                this.setState({
                                    day: {...day, date:date}

                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label for="name">Capacity</label>
                        <input
                            className="form-control"
                            value={day.capacity}
                            onChange={
                            (e)=>{
                                this.setState({
                                    day : {
                                        ...day,
                                        capacity: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    <div className="form-group">
                        <label for="name">Location</label>
                        <select
                            className="form-control"
                            value={day.location_id}
                            onChange={
                            (e)=>{
                                this.setState({
                                    day : {
                                        ...day,
                                        location_id: e.target.value
                                        }
                                });
                            }
                        }>
                            <option value=''></option>
                            {this.props.locations.map(
                            function(location){
                                return <option
                                    key={location._id}
                                    value={location._id}>
                                    {location.name + ' -- ' + location._id}
                                </option>
                            }
                        )}
                        </select>
                    </div>
                </div>
            </Dialog>
        );
    }
});

ModalEdit.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestSubmit: React.PropTypes.func.isRequired,
    deleteDay: React.PropTypes.func.isRequired,
    day: React.PropTypes.object.isRequired,
    locations: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        day: ownProps.day || {},
        locations: state.admin.locations.objects
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteDay: (id) => {
            dispatch(adminDeleteDay(id));
        },
        onRequestSubmit: (day) => {
            dispatch(adminEditDay(day));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);