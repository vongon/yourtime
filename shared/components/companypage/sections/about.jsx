import React from 'react';

var AboutSection = React.createClass({
    render: function(){
        return (
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">About Us</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                    </div>
                </div>
            </section> 
        );
    }
});

export default AboutSection;