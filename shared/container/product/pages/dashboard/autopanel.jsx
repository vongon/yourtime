import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {green500, red500, blue300, indigo900} from 'material-ui/styles/colors';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import { dashDeleteEvent } from '../../../../redux/actions/dashboard.actions';



const defaultAutoServiceEvent = {
    date: 'Thu Jun 30 2016 00:00:00 GMT-0500 (CDT)',
    service: {
        _id: "1",
        description: "Example: Express oil change with conventional oil, includes full-service quality check of fluids and filters!",
        name: "Example: Mobil Express Oil Change",
        price: 49.95,
        workplace: "all"
    },
    user_id: "auth0|5762ee5ddc8b580e1e1e6ed1",
    vehicle: {
        make: "Sentra",
        model: "Nissan",
        year: "2008"
    },
    workplace: {
        name: "BIZNAZ"
    }
};

const CarAvatar = <Avatar
        icon={<Car />}
        color={blue300}
        backgroundColor={indigo900}
        size={30}
    />;

var AutoPanel = React.createClass({
    getDefaultProps: function () {
        return {
            event: defaultAutoServiceEvent
        };
    },
    getInitialState: function(){
        return {
            deleteRequested: false
        };
    },
    stringifyVehicle: function (selectedVehicle) {
        if ($.isEmptyObject(selectedVehicle)) {
            return '';
        } else {
            return selectedVehicle.model + ' ' + selectedVehicle.make + ' ' + selectedVehicle.year + ' ';
        }
    },
    onDelete: function(){
        console.log('delete requested');
        var event_id = this.props.event._id;
        this.props.deleteEvent(event_id);
    },
    render: function () {

        return (
            <div className="row" style={{marginBottom:20}}>
                <div className="col-sm-12">
                    <Card>
                        <CardHeader
                            title={this.props.event.service.name}
                            subtitleStyle={{color: green500}}
                            subtitle={<p>Status: Booked!<br/>{'When: '+moment(this.props.event.date).format('MMMM Do YYYY')}</p>}
                            avatar={CarAvatar}
                            //avatar="http://lorempixel.com/100/100/nature/"
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardTitle
                            expandable={true}
                            title={this.props.event.service.name}
                            subtitle={this.props.event.service.description}/>
                        <CardText
                            expandable={true}
                        >
                            <Divider />
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="Service"
                                hintText="no service specified"
                                defaultValue={this.props.event.service.name}
                            />
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="Date"
                                hintText="no date specified"
                                defaultValue={moment(this.props.event.date).format('MMMM Do YYYY')}
                            />
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="Vehicle"
                                hintText="no vehicle specified"
                                defaultValue={this.stringifyVehicle(this.props.event.vehicle)}
                            />
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="Workplace"
                                hintText="no workplace specified"
                                defaultValue={this.props.event.workplace.name}
                            />
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="Total"
                                hintText="no total specified"
                                defaultValue={'$' + String(this.props.event.service.price)}
                            />
                            <Divider />
                        </CardText>
                        <CardActions
                            expandable={true}
                        >
                            <FlatButton label="Where do I drop my car off?"/>
                            {this.state.deleteRequested ?
                                <FlatButton style={{color: red500}} label="Click to confirm delete" onTouchTap={this.onDelete}/> :
                                <FlatButton onTouchTap={()=>{this.setState({deleteRequested: true})}} label="Delete"/>}
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
});

AutoPanel.propTypes = {
    event: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch){
    return {
        deleteEvent: (event_id)=>{
            dispatch(dashDeleteEvent(event_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoPanel);