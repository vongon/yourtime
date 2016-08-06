import React from 'react';

var ContactSection = React.createClass({
    render: function(){
        return (
        <section id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">Contact Us</h2>
                        <h3 className="section-subheading text-muted-onblack">Have any questions? Give us a call!</h3>
                        <h3 className="section-heading">(555)-555-5555</h3>
                        <h3 className="section-heading">info@yourtime.life</h3>
                    </div>
                </div>
            </div>
        </section>
        );
    }
});

export default ContactSection;