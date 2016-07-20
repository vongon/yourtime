import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

var LoadingSpinner = React.createClass({
    getDefaultProps: function(){
        return {
            size: 1.5,
            margin: 50
        };
    },
    render: function () {
        return (
            <div style={{textAlign:'center'}}>
                <CircularProgress size={this.props.size} style={{margin: this.props.margin}}/>
            </div>
        );
    }
});

export default LoadingSpinner;