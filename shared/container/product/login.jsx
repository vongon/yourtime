import React from 'react';
import {connect} from 'react-redux';

const styles = {
    col: {
        paddingTop: 40,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'center'
    },
    auth0_container: {
        display: 'inline-block'
    }
};

var Login = React.createClass({
    showLogin: function () {
        console.log('calling login with url: http://localhost:3000/app/dashboard')
        this.props.lock.show({
            callbackURL: 'http://localhost:3000/app/dashboard',
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email app_metadata'
            },
            container: 'auth0-lock-container'
        });
    },
    componentDidMount: function () {
        this.showLogin();
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12"
                     style={styles.col}>
                    <div style={styles.auth0_container}
                        id="auth0-lock-container"></div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
    };
}

export default connect(mapStateToProps)(Login);

