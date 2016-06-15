import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

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
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand page-scroll" href="/">YourTime</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><Link onClick={this.closeMobileMenu} to="/app/dashboard">Dashboard</Link></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    My Account <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link onClick={this.closeMobileMenu} to="/app/user">Account Settings</Link></li>
                                    <li><a onClick={this.closeMobileMenu} href="#">Sign Out</a></li>
                                </ul>
                            </li>
                            <li><a onClick={this.closeMobileMenu} href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="nav-spacer" style={{height:50}} />
            </div>
        );
    }
});

export default NavBar;