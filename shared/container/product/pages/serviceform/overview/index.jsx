import React from 'react';
import {connect} from 'react-redux';
import Overview from './overview';


var ServiceFormIndex = React.createClass({
    render: function () {
        console.log('this.props.date:', this.props.date);
        return (
            <div>
                <h3>EVENT OVERVIEW</h3>
                <Overview/>
            </div>
        );
    }
});

ServiceFormIndex.propTypes = {
    lock: React.PropTypes.object.isRequired,
    workplace_id: React.PropTypes.string.isRequired,
    vehicle_id: React.PropTypes.string.isRequired,
    services: React.PropTypes.array.isRequired,
    date: React.PropTypes.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        body: state.product.serviceform.body
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormIndex);