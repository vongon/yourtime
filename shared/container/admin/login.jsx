import React from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { authSetSnackbarMessage } from '../../redux/actions/auth.actions';

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
        this.props.lock.show({
            callbackURL: this.props.site_domain+'/admin/loading',
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email app_metadata'
            },
            container: 'auth0-lock-container'
            ,
            dict: {
                signin: {
                    title: "Admin Dashboard Login",
                    emailPlaceholder: "must_be_admin@email.com"
                }
            }
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
                <Snackbar
                    open={this.props.message !== ''}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.props.clearMessage}
                />
            </div>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        site_domain: state.auth.site_domain,
        message: state.auth.message || ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearMessage: () => {
            dispatch(authSetSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

