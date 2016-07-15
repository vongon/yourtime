import React from 'react';
import $ from 'jquery';
import { Link, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import { authLogOut } from '../../redux/actions/auth.actions';

var LoggedInNavBar = React.createClass({
    onLogOut: function(){
        this.closeMobileMenu();
        this.props.logOut();
    },
    closeMobileMenu: function(e){
        $('.navbar-toggle:visible').click();
    },
    render: function(){
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
                        <a className="navbar-brand page-scroll" href="/">YourTime</a>
                    </div>
    
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><Link onClick={this.closeMobileMenu} to="/app/dashboard">Dashboard</Link></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    {this.props.nickname} <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link onClick={this.closeMobileMenu} to="/app/user">Account Settings</Link></li>
                                    <li><a onClick={this.onLogOut} href="#">Log Out</a></li>
                                </ul>
                            </li>
                            <li><a onClick={this.closeMobileMenu} href="#">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

var LoggedOutNavBar = React.createClass({
    render: function(){
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
                        <a className="navbar-brand page-scroll" href="/">YourTime</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><Link onClick={this.closeMobileMenu} to="/app/login">Log In</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});


var NavBar = React.createClass({
    render: function () {
        var user = this.props.user;
        return (
            <div>
                {user.user_id ?
                    <LoggedInNavBar
                        nickname={user.nickname}
                        logOut={this.props.logOut}/> :
                    <LoggedOutNavBar/>}
                <div id="nav-spacer" style={{height:50}} />
            </div>
        );
    }
});

NavBar.PropTypes = {
    user: React.PropTypes.object.isRequired,
    logOut: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        user: state.auth.user || {}
    };
}

function mapDispatchToProps(dispatch){
    return {
        logOut: ()=>{
            dispatch(authLogOut());
            browserHistory.push('/app/login');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);