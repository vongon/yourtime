import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { formReset } from '../../../redux/actions/serviceform.actions';
import { green500 } from 'material-ui/styles/colors';


var Complete = React.createClass({
    componentWillUnmount: function(){
        this.props.formReset();
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{textAlign: 'center', marginBottom: 20}}>
                        <h2 style={{color: green500}}>THANK YOU!</h2>
                        <p>Your order has been submitted, you should receive an email verification soon.
                            You can navigate to your <Link to="/app/dashboard">Dashboard</Link> for more information.</p>
                    </div>
                </div>
            </div>
        );
    }
});

Complete.propTypes = {
    formReset: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        formReset: () => {
            dispatch(formReset());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Complete);