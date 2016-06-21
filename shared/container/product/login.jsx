import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

//const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';


var Login = React.createClass({
    showLogin: function(){
        console.log('calling login with url: http://localhost:3000/app/dashboard')
        this.props.lock.show({
            callbackURL: 'http://localhost:3000/app/dashboard',
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email'
            }
        });
    },
    componentDidMount: function(){
        this.showLogin();
    },
    render: function(){
        return (
            <div className="container">
                <div className="row">
                    <RaisedButton label="Default" />
                    <button className="btn btn-primary" onClick={this.showLogin}>Login</button>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state, ownProps){
    return {
        lock: state.auth.lock,
    };
}

export default connect(mapStateToProps)(Login);

