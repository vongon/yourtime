import React from 'react';
import {connect} from 'react-redux';
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import ChooseWorkplace from './chooseworkplace';
import ChooseService from './chooseservice';
import LoginPrompt from './loginprompt';
import OrderSummary from './ordersummary';
import LoadingSpinner from '../../../components/product/loadingspinner';

const styles = {
    stepLabel: {
        paddingLeft: 17
    },
    stepperCol: {
        paddingLeft: 0
    },
    stepper: {
        marginBottom: 20
    }
};


var ServiceFormStepper = React.createClass({
    getStepIndex: function(){
        switch(this.props.stepName){
            case 'chooseWorkplace':
                return 0;
            case 'chooseService':
                return 1;
            case 'orderSummary':
                return 2;
        }
    },
    render: function () {
        var stepIndex = this.getStepIndex();
        if(typeof window === 'undefined' || this.props.isLoading)return(<LoadingSpinner />);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={styles.stepperCol}>
                        <Stepper activeStep={stepIndex} orientation="vertical" style={styles.stepper}>
                            <Step>
                                <StepLabel style={styles.stepLabel}>Select Workplace</StepLabel>
                                <StepContent>
                                    <ChooseWorkplace/>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel style={styles.stepLabel}>Select Service</StepLabel>
                                <StepContent>
                                    <ChooseService/>
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel style={styles.stepLabel}>Order Overview & Payment</StepLabel>
                                <StepContent>
                                    {this.props.user ? <OrderSummary/> : <LoginPrompt/>}
                                </StepContent>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            </div>
        );
    }
});

ServiceFormStepper.propTypes = {
    stepName: React.PropTypes.oneOf(['chooseWorkplace', 'chooseService', 'orderSummary']).isRequired,
    user: React.PropTypes.object,
    isLoading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        serviceform: state.serviceform, //used to trigger renders on every change to service form state
        stepName: state.serviceform.ui.stepName,
        user: state.auth.user,
        isLoading: state.serviceform.ui.isLoading || false
    };
}

export default connect(mapStateToProps)(ServiceFormStepper);