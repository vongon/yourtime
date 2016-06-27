import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


var UserPage = React.createClass({
    onResetClick: function(){
        this.props.lock.showReset({
            callbackURL: 'http://localhost:3000/app/user',
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email'
            }
        });
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={{marginTop:20, paddingBottom: 20}}>
                        <div className="container-fluid">
                            <h3>Your Account</h3>
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="user name"
                                hintText="no user name specified"
                                defaultValue={this.props.user.name || ''}
                            />
                            <Divider/>
                            <TextField
                                disabled={true}
                                fullWidth={true}
                                underlineShow={false}
                                floatingLabelFixed={true}
                                floatingLabelText="email"
                                hintText="no email specified"
                                defaultValue={this.props.user.email || ''}
                            />
                            <Divider/>
                            <FlatButton
                                label="Change Password"
                                onTouchTap={this.onResetClick}
                                style={{marginTop: 20}}/>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

UserPage.propTypes = {
    lock: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
}


function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(UserPage);