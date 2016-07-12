import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import {red500} from 'material-ui/styles/colors'
import { adminCreateDay } from '../../../../redux/actions/admin/days.actions'


var ModalEdit = React.createClass({
    getInitialState: function () {
        return {
            day: {
                date: null,
                capacity: '',
                location_id: this.props.defaultLocationId || ''
            }
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
                title="Create Day"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
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
                            placeholder="6,7,8,etc..."
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
    locations: React.PropTypes.array.isRequired,
    defaultLocationId: React.PropTypes.string
};

function mapStateToProps(state, ownProps) {
    return {
        locations: state.admin.locations.objects
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onRequestSubmit: (day) => {
            dispatch(adminCreateDay(day));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);