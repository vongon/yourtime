import React from 'react';
import Tabs from './tabs';

var ScheduledServices = React.createClass({
    render: function () {
        return (
            <div>
                <Tabs activeTab="scheduled"/>
                <h3>all scheduled services go here</h3>
            </div>
        );
    }
});

export default ScheduledServices;