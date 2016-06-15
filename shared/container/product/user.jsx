import React from 'react';
import {connect} from 'react-redux';


var User = React.createClass({
    render: function () {
        return (
            <h1 style={{marginTop: 100}}>User!</h1>
        );
    }
});

export default connect()(User);