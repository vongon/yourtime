import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


var Dashboard = React.createClass({
    render: function () {
        return (
            <div>
                <h1 style={{marginTop: 100}}>Dashboard!</h1>
                {this.props.children}
            </div>
        );
    }
});

function mapStateToProps(state, ownProps) {
    return {
        path: ownProps.location.pathname
    };
}

export default connect(mapStateToProps)(Dashboard);