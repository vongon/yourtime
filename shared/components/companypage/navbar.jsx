import React from 'react';
import $ from 'jquery';

var NavBar = React.createClass({
    componentDidMount: function () {
        console.log('component did mount');
        window.addEventListener("scroll", this.scrollListener);
    },
    componentWillUnmount: function(){
        window.removeEventListener("scroll", this.scrollListener);
    },
    scrollListener: function(){
        var offset = 50;
        var servicesPos = $('#services').offset().top - offset;
        var howitworksPos = $('#howitworks').offset().top - offset;
        var faqPos = $('#faq').offset().top - offset;
        var aboutPos = $('#about').offset().top - offset;
        var contactPos = $('#contact').offset().top - offset;

        var scrollPos = $(document).scrollTop();

        if( scrollPos < servicesPos){
            $("a[href$='#services']").blur();
            $("a[href$='#howitworks']").blur();
            $("a[href$='#faq']").blur();
            $("a[href$='#about']").blur();
            $("a[href$='#contact']").blur();
        }
        else if( scrollPos >= servicesPos && scrollPos < howitworksPos) $("a[href$='#services']").focus();
        else if( scrollPos >= howitworksPos && scrollPos < faqPos) $("a[href$='#howitworks']").focus();
        else if( scrollPos >= faqPos && scrollPos < aboutPos) $("a[href$='#faq']").focus();
        else if( scrollPos >= about && scrollPos < contactPos) $("a[href$='#about']").focus();
        else if( scrollPos >= contactPos) $("a[href$='#contact']").focus();
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
                        <a className="navbar-brand page-scroll" href="#">YourTime</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="hidden"><a href="#page-top"></a></li>
                            <li><a className="page-scroll" href="#services">Services</a></li>
                            <li><a className="page-scroll" href="#howitworks">How It Works</a></li>
                            <li><a className="page-scroll" href="#contact">Contact</a></li>
                            <li><a className="page-scroll btn btn-primary btn-menu-booknow" href="#">Book Now!</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

export default NavBar;