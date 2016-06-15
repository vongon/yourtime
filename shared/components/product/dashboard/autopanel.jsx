import React from 'react';

var AutoPanel = React.createClass({
    render: function () {
        return (
            <div className="panel panel-success" style={this.props.style}>
                <div className="panel-heading">
                    <h3 className="panel-title">Auto Service</h3>
                </div>
                <div className="panel-body">
                    Vroom, vroomm....
                </div>
            </div>
        );
    }
});

export default AutoPanel;