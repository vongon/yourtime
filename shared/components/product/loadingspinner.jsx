import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

var LoadingSpinner = React.createClass({
    render: function () {
        return (
            <div style={{textAlign:'center'}}>
                <CircularProgress size={1.5} style={{margin: 50}}/>
            </div>
        );
    }
});

export default LoadingSpinner;