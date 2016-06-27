import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import { formInitialize } from '../../../redux/actions/serviceform.actions';
import Complete from './complete';
import Error from './error';
import Stepper from './stepper';

const styles = {
    paper: {
        marginTop: 20,
        boxSizing: 'content-box'
    }
};

var ServiceFormIndex = React.createClass({
    componentDidMount: function () {
        var lock = this.props.lock;
        this.props.formInitialize(lock);
    },
    render: function () {
        var stepName = this.props.stepName;
        return (
            <Paper style={styles.paper} zDepth={1}>
                {stepName === 'complete' ? <Complete/> :
                    stepName === 'error' ? <Error/> : <Stepper/>}
            </Paper>
        );
    }
});

ServiceFormIndex.propTypes = {
    stepName: React.PropTypes.oneOf(['chooseWorkplace', 'chooseService', 'orderSummary', 'complete', 'error']).isRequired,
    lock: React.PropTypes.object.isRequired,
    formInitialize: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        stepName: state.serviceform.ui.stepName,
        lock: state.auth.lock,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formInitialize: (lock) => {
            dispatch(formInitialize(lock));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormIndex);