import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { formReset } from '../../../redux/actions/serviceform.actions';
import {red600} from 'material-ui/styles/colors';


var Error = React.createClass({
    componentWillUnmount: function(){
        this.props.formReset();
    },
    render: function () {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{textAlign: 'center', marginBottom: 20}}>
                        <h2 style={{color: red600}}>Uh Oh!</h2>
                        <p>We're Sorry, there was an error while booking your service. Don't worry, we do not charge any incomplete services.
                            You can navigate to your <Link to="/app/dashboard">Dashboard</Link> to try again.</p>
                    </div>
                </div>
            </div>
        );
    }
});

Error.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Error);