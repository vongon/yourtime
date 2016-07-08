import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { authGetUser } from '../../redux/actions/auth.actions';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../components/product/loadingspinner';

const styles = {
    paper: {
        marginTop: 20,
    }
};

var Loading = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.isLoading) return; //skip if in loading state

        if (nextProps.user) {
            //user logged in
            console.log('loading -> dashboard')
            browserHistory.push('/admin/home');
        }
        else {
            //user did not login
            console.log('loading -> login');
            browserHistory.push('/admin/login');
        }
    },
    componentDidMount: function () {
        var lock = this.props.lock;
        this.props.dispatch( authGetUser(lock) );
    },
    render: function () {
        return (
            <Paper style={styles.paper} zDepth={1}>
                <LoadingSpinner />
            </Paper>
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

