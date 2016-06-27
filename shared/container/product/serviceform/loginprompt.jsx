import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { formSetStep } from '../../../redux/actions/serviceform.actions';


var LoginPrompt = React.createClass({
    showLogin: function(){
        this.props.lock.show({
            callbackURL: this.props.site_domain+'/app/book',
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email',
                state: JSON.stringify(this.props.serviceformSnapshot)
            }
        });
    },
    render: function () {
        return (
            <div>
                <h3>Uh Oh!</h3>
                <p>Please login or sign up to complete your transaction, don't worry everything will be waiting for you right here as you left it :~)</p>
                <RaisedButton
                    label={'Login or Sign Up'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.showLogin}
                    style={{marginRight: 12, marginTop: 12}}
                />
                <FlatButton
                    label="Back"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onTouchTap={()=>{this.props.setStep('chooseService')}}
                />
            </div>
        );
    }
});

LoginPrompt.propTypes = {
    lock: React.PropTypes.object.isRequired,
    serviceformSnapshot: React.PropTypes.object.isRequired,
    setStep: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        lock: state.auth.lock,
        serviceformSnapshot: state.serviceform,
        site_domain: state.auth.site_domain
    };
}

function mapDispatchToProps(dispatch){
    return {
        setStep: (stepName) => {
            dispatch(formSetStep(stepName))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPrompt);