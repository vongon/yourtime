import React from 'react';
import {connect} from 'react-redux';


var User = React.createClass({
    render: function () {
        return (
            <div>
                <h1 style={{marginTop: 100}}>User!</h1>
            </div>
        );
    }
});

export default connect()(User);