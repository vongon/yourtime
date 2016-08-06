import React from 'react';
import { Link } from 'react-router';

var Header = React.createClass({
    render: function(){
        return (
            <header>
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome to YourTime!</div>
                        <div className="intro-heading">Let us take care of your vehicle while you work</div>
                        <a onClick={this.props.openComingSoonModal} className="btn btn-xl">Book A Service Now</a>
                        {/*<Link to={this.props.appPath} className="btn btn-xl">Book A Service Now</Link>*/}
                    </div>
                </div>
            </header>
        );
    }
});

export default Header;