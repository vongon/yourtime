import React from 'react';
import Tabs from './tabs';

var CompletedServices = React.createClass({
    render: function () {
        return (
            <div>
                <Tabs activeTab="completed"/>
                <h3>all completed services go here</h3>
            </div>
        );
    }
});

export default CompletedServices;