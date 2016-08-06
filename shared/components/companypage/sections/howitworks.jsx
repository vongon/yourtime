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
                                        <h4>1. Drive to work (Sorry, can't get you out of this part!)</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">You drive to work like normal and leave you keys with us.</p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <div className="timeline-image">
                                    <img className="img-circle img-responsive" src="img/howitworks/step2.jpg" alt=""/>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>2. We take care of your auto service requests</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">While you work we take care of the services requested by using one of our trusted vendors.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="timeline-image">
                                    <img className="img-circle img-responsive" src="img/howitworks/step3.jpg" alt=""/>
                                </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading">
                                        <h4>3. Enjoy the time saved!</h4>
                                    </div>
                                    <div className="timeline-body">
                                        <p className="text-muted">Clock out, grab your keys, and enjoy your evening!</p>
                                    </div>
                                </div>
                            </li>
                            <li className="timeline-inverted">
                                <a onClick={this.props.openComingSoonModal}
                                   style={{cursor:'pointer'}}
                                    alt="book a service now">
                                    <div className="timeline-image">
                                        <h4>Book A
                                            <br />Service
                                            <br />Now!</h4>
                                    </div>
                                </a>
                                {/*<Link to={this.props.appPath} alt="book a service now">
                                    <div className="timeline-image">
                                        <h4>Book A
                                        <br />Service
                                        <br />Now!</h4>
                                    </div>
                                </Link>*/}
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