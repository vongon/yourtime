import React from 'react';
import $ from 'jquery';

var NavBar = React.createClass({
    closeMobileMenu: function(e){
        $('.navbar-toggle:visible').click();
    },
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top navbar-shrink">
                    <div className="container">
                        <div className="navbar-header page-scroll">
                            <a className="navbar-brand page-scroll" href="/">YourTime</a>
                        </div>
                    </div>
                </nav>
                <div id="nav-spacer" style={{height:50}} />
            </div>
        );
    }
});

export default NavBar;