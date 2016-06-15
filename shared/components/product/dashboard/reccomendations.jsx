import React from 'react';
import Tabs from './tabs';

var Recommendations = React.createClass({
    render: function () {
        return (
            <div>
                <Tabs activeTab="recommendations"/>
                <h3>all recommended services go here</h3>
            </div>
        );
    }
});

export default Recommendations;