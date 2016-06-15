import React from 'react';
import {connect} from 'react-redux';


var NewService = React.createClass({
    render: function () {
        return (
            <div>
                <h1 style={{marginTop: 100}}>New Service!</h1>
            </div>
        );
    }
});

export default connect()(NewService);