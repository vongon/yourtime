import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';


var App = React.createClass({
    render: function () {
        console.log('render App');
        return (
        <div className="index">
            { this.props.children }
        </div>
        );

    }
});

export default connect()(App);
