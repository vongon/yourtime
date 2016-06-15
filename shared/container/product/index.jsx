import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../../components/product/navbar';

var Index = React.createClass({
    render: function(){
        return (
            <div className="container">
                <NavBar />
                {this.props.children}
            </div>
        );
    }
});

export default connect()(Index);

