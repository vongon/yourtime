import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

var NavBar = React.createClass({
    componentDidMount: function () {
        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

        //window.addEventListener("scroll", this.scrollListener);//disable b/c it looks weird on mobile
    },
    componentWillUnmount: function () {
        //window.removeEventListener("scroll", this.scrollListener);//disable b/c it looks weird on mobile
    },
    scrollListener: function () {
        var checkScrolling = function () {
            var offset = 50;
            var servicesPos = $('#services').offset().top - offset;
            var howitworksPos = $('#howitworks').offset().top - offset;
            var faqPos = $('#faq').offset().top - offset;
            var aboutPos = $('#about').offset().top - offset;
            var contactPos = $('#contact').offset().top - offset;

            var scrollPos = $(document).scrollTop();

            if (scrollPos < servicesPos) {
                $("a[href$='#services']").blur();
                $("a[href$='#howitworks']").blur();
                $("a[href$='#faq']").blur();
                $("a[href$='#about']").blur();
                $("a[href$='#contact']").blur();
            }
            else if (scrollPos >= servicesPos && scrollPos < howitworksPos) $("a[href$='#services']").focus();
            else if (scrollPos >= howitworksPos && scrollPos < faqPos) $("a[href$='#howitworks']").focus();
            else if (scrollPos >= faqPos && scrollPos < aboutPos) $("a[href$='#faq']").focus();
            else if (scrollPos >= about && scrollPos < contactPos) $("a[href$='#about']").focus();
            else if (scrollPos >= contactPos) $("a[href$='#contact']").focus();
        }
        setTimeout(checkScrolling, 250); //call on 250ms interval to reduce browser load
    },
    render: function () {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
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