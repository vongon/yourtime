import React from 'react';
import {connect} from 'react-redux';


var NewService = React.createClass({
    render: function () {
        return (
            <h1 style={{marginTop: 100}}>New Service!</h1>
        );
    }
});

export default connect()(NewService);