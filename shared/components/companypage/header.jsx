import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
    render: function(){
        return (
            <header>
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome to YourTime!</div>
                        <div className="intro-heading">It's nice to meet you</div>
                        <Link to={this.props.appPath} className="btn btn-xl">Book A Service Now</Link>
                    </div>
                </div>
            </header>
        );
    }
});

export default Header;