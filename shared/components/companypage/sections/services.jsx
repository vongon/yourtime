import React from 'react';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/communication/voicemail';
import {indigo500, cyan500, lightBlue500, lightBlueA400, cyanA400, blue500} from 'material-ui/styles/colors';
const styles = {
    col: {
        marginBottom: 40
    },
    icon: {

    }
}
import CarWashIcon from 'material-ui/svg-icons/maps/local-car-wash';
import OilChangeIcon from 'material-ui/svg-icons/action/opacity';
import FlushIcon from 'material-ui/svg-icons/action/autorenew';
import InspectionIcon from 'material-ui/svg-icons/communication/contact-mail';
import TireRotationIcon from 'material-ui/svg-icons/image/camera';
import TuneUpsIcon from 'material-ui/svg-icons/action/build';



var ServicesSection = React.createClass({
    render: function () {
        return (
            <section id="services" className="bg-light-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="section-heading">Auto Services</h2>
                            <h3 className="section-subheading text-muted">These are just a few things we can do to save
                                you time.</h3>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-4" style={styles.col}>
                            {/*----------------------------------------------------------------*/}
                                <Avatar
                                    icon={<CarWashIcon/>}
                                    color={'#FFFFFF'}
                                    backgroundColor={indigo500}
                                    size={100}
                                    style={styles.icon}
                                />
                                <h4 className="service-heading">Car Wash</h4>
                                {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                                 a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}

                        <div className="col-sm-4" style={styles.col}>
                            <Avatar
                                icon={<OilChangeIcon/>}
                                color={'#FFFFFF'}
                                backgroundColor={cyan500}
                                size={100}
                                style={styles.icon}
                            />
                                <h4 className="service-heading">Oil Change</h4>
                                {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                                 a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}

                        <div className="col-sm-4" style={styles.col}>
                            <Avatar
                                icon={<FlushIcon/>}
                                color={'#FFFFFF'}
                                backgroundColor={blue500}
                                size={100}
                                style={styles.icon}
                            />
                            <h4 className="service-heading">Routine Flush</h4>
                            {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                             a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}

                        <div className="col-sm-4" style={styles.col}>
                            <Avatar
                                icon={<InspectionIcon/>}
                                color={'#FFFFFF'}
                                backgroundColor={cyanA400}
                                size={100}
                                style={styles.icon}
                            />
                            <h4 className="service-heading">Texas State Inspection</h4>
                            {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                             a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}

                        <div className="col-sm-4" style={styles.col}>
                            <Avatar
                                icon={<TireRotationIcon/>}
                                color={'#FFFFFF'}
                                backgroundColor={lightBlue500}
                                size={100}
                                style={styles.icon}
                            />
                            <h4 className="service-heading">Tire Rotation</h4>
                            {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                             a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}

                        <div className="col-sm-4" style={styles.col}>
                            <Avatar
                                icon={<TuneUpsIcon/>}
                                color={'#FFFFFF'}
                                backgroundColor={indigo500}
                                size={100}
                                style={styles.icon}
                            />
                            <h4 className="service-heading">Tune Up</h4>
                            {/*<p className="text-muted">Keep your car lubed! Our <a href="#">auto shop</a> guarantees
                             a high quality job, plus you will get a full report on vehicle health recommended maintenance for the future.</p>*/}
                        </div>
                        {/*----------------------------------------------------------------*/}
                    </div>
                </div>
            </section>
        );
    }
});

export default ServicesSection;