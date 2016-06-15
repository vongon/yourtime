import React from 'react';

var LoadPanel = React.createClass({
    render: function () {
        return (
            <div className="panel panel-default" style={this.props.style}>
                <div className="panel-body">
                    Load previous services...
                </div>
            </div>
        );
    }
});

export default LoadPanel;