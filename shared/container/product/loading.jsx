import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { authGetUser } from '../../redux/actions/auth.actions';

var Loading = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isLoading) return; //skip if in loading state

        if (nextProps.user) {
            //user logged in
            console.log('loading -> dashboard')
            browserHistory.push('/app/dashboard');
        }
        else {
            //user did not login
            console.log('loading -> login');
            browserHistory.push('/app/login');
        }
    },
    componentDidMount: function () {
        var lock = this.props.lock;
        this.props.dispatch( authGetUser(lock) );
    },
    render: function () {
        return (
            <h3>*** Loading Spinner Here ***</h3>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        user: state.auth.user,
        isLoading: state.auth.isLoading
    };
}

export default connect(mapStateToProps)(Loading);

