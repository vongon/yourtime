import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { authSetLock } from '../redux/actions/auth.actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


var App = React.createClass({
    componentWillMount: function(){
        if(typeof window === 'undefined') return; //lock only works on client
        var Auth0Lock = require('auth0-lock');
        var lock = new Auth0Lock(this.props.auth0_client, this.props.auth0_domain);
        this.props.dispatch( authSetLock(lock) );
    },
    render: function () {
        console.log('render App');
        return (
        <div className="index">
            <MuiThemeProvider>
            { this.props.children }
            </MuiThemeProvider>
        </div>
        );

    }
});

function mapStateToProps(state, ownProps){
    return {
        auth0_domain: state.auth.auth0_domain,
        auth0_client: state.auth.auth0_client
    }
}

export default connect(mapStateToProps)(App);
