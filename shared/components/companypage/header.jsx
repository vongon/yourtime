import React from 'react';

var Header = React.createClass({
    render: function(){
        return (
            <header>
                <div className="container">
                    <div className="intro-text">
                        <div className="intro-lead-in">Welcome to YourTime!</div>
                        <div className="intro-heading">It's nice to meet you</div>
                        <a href="#" className="page-scroll btn btn-xl">Book A Service Now</a>
                    </div>
                </div>
            </header>
        );
    }
});

export default Header;