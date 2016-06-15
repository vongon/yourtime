import React from 'react';
import { connect } from 'react-redux';
import AutoPanel from '../../components/product/dashboard/autopanel';
import NewPanel from '../../components/product/dashboard/newpanel';
import LoadPanel from '../../components/product/dashboard/loadpanel'




var Dashboard = React.createClass({
    render: function () {
        return (
            <div>
                <h2 className="dashboard-title">My Services</h2>
                <NewPanel />
                <AutoPanel />
                <hr />
                <LoadPanel />
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