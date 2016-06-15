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
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header page-scroll">
                            {/*<button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>*/}
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