import React from 'react';

var ServicesSection = React.createClass({
    render: function(){
        return (
        <section id="services" className="bg-light-gray">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">Auto Services</h2>
                        <h3 className="section-subheading text-muted">These are just a few things we can do to save you time.</h3>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-car fa-stack-1x fa-inverse"></i>
                    </span>
                        <h4 className="service-heading">Oil Changes</h4>
                        <p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                            a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>
                    </div>
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-cog fa-stack-1x fa-inverse"></i>
                    </span>
                        <h4 className="service-heading">Tire Rotations</h4>
                        <p className="text-muted">Keep your treads trackin'! Our <a href="#">auto shop</a> guarantees
                            a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future</p>
                    </div>
                    <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-search fa-stack-1x fa-inverse"></i>
                    </span>
                        <h4 className="service-heading">State Inspections</h4>
                        <p className="text-muted">Keep your inspections inspected! Our <a href="#">auto shop</a> guarantees
                            a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future</p>
                    </div>
                </div>
            </div>
        </section>
        );
    }
});

export default ServicesSection;