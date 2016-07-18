import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {greenA400} from 'material-ui/styles/colors';
import { Link } from 'react-router';
import {resetServiceForm} from '../../../../../redux/actions/product/global.actions';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
    },
    icon: {
        fill: greenA400,
        height: 150,
        width: 150
    }
};

var SubmitSuccess = React.createClass({
    componentWillUnmount: function(){
        this.props.resetServiceform();
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <CheckCircle id="success-icon" style={styles.icon}/>
                            <h4>Your Event Has Been Booked!</h4>
                            <Link to="/app/dashboard"><p>return to Dashboard</p></Link>
                        </div>
                    </Paper>
                    <Divider style={{marginTop:20, marginBottom:20}}/>
                </div>
            </div>
        );
    }
});

SubmitSuccess.propTypes = {
    resetServiceform: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        resetServiceform: ()=>{
            dispatch(resetServiceForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitSuccess);