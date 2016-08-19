import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

var NavBar = React.createClass({
    componentDidMount: function () {
        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });
    },
    render: function () {
        return (
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
                        <a className="navbar-brand page-scroll" href="#page-top">YourTime</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><a className="page-scroll" href="#services">Services</a></li>
                            <li><a className="page-scroll" href="#howitworks">How It Works</a></li>
                            <li><a className="page-scroll" href="#contact">Contact</a></li>
                            <li><a className="btn btn-primary btn-menu-booknow" onClick={this.props.openComingSoonModal}>Book Now!</a></li>
                            {/*<li><Link className="btn btn-primary btn-menu-booknow" to={this.props.appPath}>Book Now!</Link></li>*/}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default NavBar;