import React from 'react';
import NavBar from './navbar';
import Header from './header';
import ServicesSection from './sections/services';
import HowItWorksSection from './sections/howitworks';
import VendorsSection from './sections/vendors';
import FAQSection from './sections/faq';
import AboutSection from './sections/about';
import ContactSection from './sections/contact';
import Footer from './footer';
import {connect} from 'react-redux';

var Index = React.createClass({
    render: function(){
        return (
            <div>
                <NavBar />
                <Header />
                <ServicesSection />
                <HowItWorksSection />
                <FAQSection />
                <AboutSection />
                <ContactSection />
                <Footer />
            </div>
        );
    }
});

export default Index;