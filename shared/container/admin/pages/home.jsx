import React from 'react';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import {dashGetEvents} from '../../../redux/actions/dashboard.actions';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../components/product/loadingspinner';





var Home = React.createClass({
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
                <h2 className="dashboard-title">Admin Home</h2>
                <Divider style={{marginTop: 20, marginBottom:20}}/>
            </div>
        );
    }
});

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);