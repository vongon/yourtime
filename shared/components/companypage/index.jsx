import React from 'react';
import NavBar from './navbar';
import Header from './header';
import ServicesSection from './sections/services';
import HowItWorksSection from './sections/howitworks';
import FAQSection from './sections/faq';
import AboutSection from './sections/about';
import ContactSection from './sections/contact';
import Footer from './footer';

var Index = React.createClass({
    componentDidMount: function(){
        var findScrollPos = function(selectorStr){
            var selector = $(selectorStr);
            var offset = selector.offset();
            var navbarHeight = 50; //height of .navbar-shrink
            return offset.top - navbarHeight;
        };

        $(function() {
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: findScrollPos($anchor.attr('href'))
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function() {
            $('.navbar-toggle:visible').click();
        });

        this.scrollWatcher();
    },
    scrollWatcher: function(){
        var docElem = document.documentElement,
            header = document.querySelector( '.navbar-default' ),
            didScroll = false,
            changeHeaderOn = 150; //pixel value to change header

        function init() {
            window.addEventListener( 'scroll', function( event ) {
                if( !didScroll ) {
                    didScroll = true;
                    setTimeout( scrollPage, 250 );
                }
            }, false );
        }

        function scrollPage() {
            var sy = scrollY();
            if ( sy >= changeHeaderOn ) {
                classie.add( header, 'navbar-shrink' );
            }
            else {
                classie.remove( header, 'navbar-shrink' );
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();
    },
    render: function(){
        var appPath = "/app";
        return (
            <div id="page-top">
                <NavBar appPath = {appPath}/>
                <Header appPath = {appPath}/>
                <ServicesSection />
                <HowItWorksSection appPath = {appPath}/>
                <FAQSection />
                <AboutSection />
                <ContactSection />
                <Footer />
            </div>
        );
    }
});

export default Index;