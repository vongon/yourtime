import React from 'react';
import { Link } from 'react-router';

var HowItWorksSection = React.createClass({
    render: function(){
        return (
        <section id="howitworks">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">How It Works</h2>
                        <h3 className="section-subheading text-muted">Here's the basic rundown!</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="timeline">
                            <li>
                                <div className="timeline-image">
                                    <img className="img-circle img-responsive" src="img/howitworks/step1.jpg" alt=""/>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>1. Drop your car off</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                                            temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea
                                            quo dolore laudantium consectetur!</p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <img className="img-circle img-responsive" src="img/howitworks/step2.jpg" alt=""/>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>2. We take care of the work</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                                            temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea
                                            quo dolore laudantium consectetur!</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-image">
                                    <img className="img-circle img-responsive" src="img/howitworks/step3.jpg" alt=""/>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>3. You pick your car up</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis
                                            temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea
                                            quo dolore laudantium consectetur!</p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <Link to={this.props.appPath} alt="book a service now">
                                    <div className="timeline-image">
                                        <h4>Book A
                                        <br />Service
                                        <br />Now!</h4>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        );
    }
});

export default HowItWorksSection;