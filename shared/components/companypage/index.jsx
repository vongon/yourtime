import React from 'react';
import Helmet from 'react-helmet';
import NavBar from './navbar';
import Header from './header';
import ServicesSection from './sections/services';
import HowItWorksSection from './sections/howitworks';
import FAQSection from './sections/faq';
import AboutSection from './sections/about';
import ContactSection from './sections/contact';
import Footer from './footer';
import ComingSoonRibbon from './comingsoonribbon';
import ModalComingSoon from './modalcomingsoon';

var Index = React.createClass({
    getInitialState: function () {
        return {
            modalOpen: false
        }
    },
    componentDidMount: function () {
        var findScrollPos = function (selectorStr) {
            var selector = $(selectorStr);
            var offset = selector.offset();
            var navbarHeight = 50; //height of .navbar-shrink
            return offset.top - navbarHeight;
        };

        $(function () {
            $('a.page-scroll').bind('click', function (event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: findScrollPos($anchor.attr('href'))
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });

        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function () {
            $('.navbar-toggle:visible').click();
        });

        this.scrollWatcher();
    },
    scrollWatcher: function () {
        var docElem = document.documentElement,
            header = document.querySelector('.navbar-default'),
            didScroll = false,
            changeHeaderOn = 150; //pixel value to change header

        function init() {
            window.addEventListener('scroll', function (event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 250);
                }
            }, false);
        }

        function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
                classie.add(header, 'navbar-shrink');
            }
            else {
                classie.remove(header, 'navbar-shrink');
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();
    },
    openComingSoonModal: function () {
        this.setState({
            modalOpen: true
        });
    },
    render: function () {
        var appPath = "/app/book";
        return (
            <div id="page-top">
                <Helmet
                    title="YourTime"
                    meta={[
                    { charset: 'utf-8' },
                    {
                      'http-equiv': 'X-UA-Compatible',
                      content: 'IE=edge',
                    },
                    {
                      name: 'viewport',
                      content: 'width=device-width, initial-scale=1',
                    },
                  ]}
                    link={[
                {"href":"/css/bootstrap.min.css","rel":"stylesheet"},
                {"href":"/css/companypage.css","rel":"stylesheet"},
                {"href":"/font-awesome/css/font-awesome.min.css","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Montserrat:400,700","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Kaushan+Script","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700","rel":"stylesheet","type":"text/css"}
                ]}
                />
                <ModalComingSoon
                    open={this.state.modalOpen}
                    onRequestClose={()=>{ this.setState({modalOpen: false}) }}
                />
                <ComingSoonRibbon/>
                <NavBar appPath = {appPath} openComingSoonModal={this.openComingSoonModal}/>
                <Header appPath = {appPath} openComingSoonModal={this.openComingSoonModal}/>
                <ServicesSection />
                <HowItWorksSection appPath = {appPath} openComingSoonModal={this.openComingSoonModal}/>
                <FAQSection />
                {/*<AboutSection />*/}
                <ContactSection />
                <Footer />
            </div>
        );
    }
                });

                export default Index;