import React from 'react';
import { connect } from 'react-redux';
import AutoPanel from './dashboard/autopanel';
import NewPanel from '../../components/product/dashboard/newpanel';
import LoadPanel from '../../components/product/dashboard/loadpanel'
import Divider from 'material-ui/Divider';
import {dashGetEvents} from '../../redux/actions/dashboard.actions';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../components/product/loadingspinner';





var Dashboard = React.createClass({
    componentDidMount: function(){
        console.log('dash mounted');
        this.props.getEvents();
    },
    render: function () {
        if(this.props.isLoading){
            return (<Paper style={{marginTop:20}} zDepth={1}><LoadingSpinner/></Paper>);
        }
        return (
            <div>
                <h2 className="dashboard-title">My Services</h2>
                <NewPanel />
                {this.props.events.map(function(event){
                    return <AutoPanel key={event._id} event={event} />
                })}
                <Divider style={{marginTop: 20, marginBottom:20}}/>
            </div>
        );
    }
});

Dashboard.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    events: React.PropTypes.array.isRequired,
    getEvents: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.dashboard.isLoading || false,
        events: state.dashboard.events || []
    };
}

function mapDispatchToProps(dispatch){
    return {
        getEvents: ()=>{
            dispatch(dashGetEvents());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);