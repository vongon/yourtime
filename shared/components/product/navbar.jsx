import React from 'react';
import { Link } from 'react-router';

var NavBar = React.createClass({
    componentDidMount: function(){
        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function() {
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
                        <Link className="navbar-brand page-scroll" to="/">YourTime</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><Link to="/app/dashboard">Dashboard</Link></li>
                            <li><Link to="/app/user">User Info</Link></li>
                            <li><Link className="btn btn-primary btn-menu-booknow" to="/app/book">Book</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default NavBar;