import React from 'react';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {greenA400, red500, blue300, indigo900} from 'material-ui/styles/colors';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import {dashDeleteEvent} from '../../../../redux/actions/product/dashboard.actions';
import {asyncGetEventData} from '../../../../redux/actions/product/serviceform/overview.actions';
import LoadingSpinner from '../../../../components/product/loadingspinner';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import Settings from 'material-ui/svg-icons/action/settings';


const styles = {
    row: {
        marginBottom: 20
    },
    td: {
        borderTop: '0px',
        verticalAlign: 'middle'
    },
    card: {
        subtitle: {
            fontWeight: 200
        }
    }
};

const defaultAutoServiceEvent = {
    name: 'example event',
    date: 'Thu Jun 30 2016 00:00:00 GMT-0500 (CDT)',
    services: ["_id", "_id"],
    user_id: "auth0|5762ee5ddc8b580e1e1e6ed1",
    vehicle_id: "",
    workplace_id: "",
    status: "pending"
};

const CarAvatar = <Avatar
    icon={<Car />}
    color={'#FFF'}
    backgroundColor={'#04d7ff'}
    size={30}
/>;

var AutoPanel = React.createClass({
    getInitialState: function () {
        return {
            deleteRequested: false,
            isLoading: false,
            asyncError: false,
            event: this.props.event
        };
    },
    onDelete: function () {
        console.log('delete requested');
        var event_id = this.props.event._id;
        this.props.deleteEvent(event_id);
    },
    asyncGetEventData: function () {
        this.setState({isLoading: true});
        asyncGetEventData(this.state.event, (err, event)=>{
            if(err){
                this.setState({isLoading: false, asyncError: true});
            }
            this.setState({isLoading: false, event: event});
        });
    },
    getSubtitle: function(){
        var event = this.state.event;
        if(event.status === 'pending'){
            return <p style={{fontWeight: 200, color: greenA400}}>
                Status: Booked
                <br/>
                {'When: '+moment(event.date).format('MMMM Do YYYY')}
            </p>
        }
        if(event.status === 'complete'){
            return <p style={{fontWeight: 200, color: '#AAA'}}>
                Status: Completed
                <br/>
                {'When: '+moment(event.date).format('MMMM Do YYYY')}
            </p>
        }
    },
    getTotal: function(){
        var services = this.state.event.services_objects;
        var total = 0;
        for(var i=0; i<services.length; i++){
            var service = services[i];
            total += service.price;
        }
        return total;
    },
    componentDidMount: function () {
        this.asyncGetEventData();
    },
    render: function () {
        if (this.state.isLoading) {
            return (<div className="row" style={styles.row}><div className="col-sm-12"><Card><CardHeader showExpandableButton={true}><LoadingSpinner size={.5} margin={0}/></CardHeader></Card></div></div>);
        }
        if (this.state.asyncError) {
            return (<div className="row" style={styles.row}><div className="col-sm-12"><Card><CardHeader title='error loading event :(' showExpandableButton={true}/></Card></div></div>);
        }
        var event = this.state.event;
        return (
            <div className="row" style={styles.row}>
                <div className="col-sm-12">
                    <Card>
                        <CardHeader
                            title={'Event for '+event.vehicle_name}
                            subtitle={this.getSubtitle()}
                            avatar={CarAvatar}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText
                            expandable={true}
                        >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4>SUMMARY</h4>
                                        <Divider/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-11">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <td className="col-sm-3"></td>
                                                <td className="col-sm-6"></td>
                                                <td className="col-sm-3"></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td style={styles.td}><h5>WORKPLACE:</h5></td>
                                                <td style={styles.td}>{event.workplace_name || 'no workplace found'}</td>
                                            </tr>
                                            <tr>
                                                <td style={styles.td}><h5>DATE:</h5></td>
                                                <td style={styles.td}>{event.date ? moment(event.date).format('dddd [-] ll') : 'no date found'}
                                                    <Link to="/app/book">
                                                        <FlatButton
                                                            icon={<Settings/>}
                                                            style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={styles.td}><h5>VEHICLE:</h5></td>
                                                <td style={styles.td}>{event.vehicle_name || 'no vehicle found'}
                                                    <Link to="/app/book">
                                                        <FlatButton
                                                            icon={<Settings/>}
                                                            style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4>SERVICES</h4>
                                        <Divider/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-11">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <td className="col-sm-3"></td>
                                                <td className="col-sm-6"></td>
                                                <td className="col-sm-3"></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {event.services_objects.map(
                                                (service)=>{
                                                    return <tr key={service._id}>
                                                        <td style={styles.td}>{service.name}</td>
                                                        <td style={styles.td}>{'$ '+service.price}</td>
                                                        <td style={styles.td}>
                                                            <Link to="/app/book">
                                                                <FlatButton
                                                                    icon={<Settings/>}
                                                                    style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                                />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                }
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4>PAYMENT</h4>
                                        <Divider/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-11">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <td className="col-sm-3"></td>
                                                <td className="col-sm-9"></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td style={styles.td}><h5>TOTAL:</h5></td>
                                                <td style={styles.td}>{'$ '+this.getTotal()}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </CardText>
                        <CardActions
                            expandable={true}
                        >
                            <FlatButton label="Where do I drop my car off?"/>
                            {this.state.deleteRequested ?
                                <FlatButton style={{color: red500}} label="Click to confirm delete"
                                            onTouchTap={this.onDelete}/> :
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
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        deleteEvent: (event_id)=> {
            dispatch(dashDeleteEvent(event_id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoPanel);