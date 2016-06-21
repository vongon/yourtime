import React from 'react';
import Spinner from 'react-spin';
import config from '../../../config';

var Services = React.createClass({
    propTypes: {
        isLoading: React.PropTypes.bool,
        availableServices: React.PropTypes.array.isRequired,
        asyncSetService: React.PropTypes.func.isRequired
    },
    onSelect: function (e) {
        var selection = e.currentTarget.id;
        console.log('selected service: ', selection);
        this.props.asyncSetService(selection)
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        {this.props.isLoading && <Spinner config={config.SpinnerOpts}/>}
                        <h2>Select A Service</h2>
                        <div className="list-group">
                            <a id="Mobil Special" onClick={this.onSelect} href="#" className="list-group-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h4 className="list-group-item-heading">Mobil Special</h4>
                                            <p className="list-group-item-text">Oil and filter change up to 5 qts.
                                                *Canister filter extra.</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h4>$35.95*</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a id="Mobil Super HighMileage" onClick={this.onSelect} href="#" className="list-group-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h4 className="list-group-item-heading">Mobil Super High Mileage</h4>
                                            <p className="list-group-item-text">Oil and filter change up to 5 qts.
                                                *Canister filter extra.</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h4>$52.95*</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a id="Mobil Super Synthetic" onClick={this.onSelect} href="#" className="list-group-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h4 className="list-group-item-heading">Mobil Super Synthetic</h4>
                                            <p className="list-group-item-text">Oil and filter change up to 5 qts.
                                                *Canister filter extra.</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h4>$64.95*</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a id="Tire Rotation" onClick={this.onSelect} href="#" className="list-group-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h4 className="list-group-item-heading">Tire Rotation</h4>
                                            <p className="list-group-item-text"></p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h4>starting at $19.99</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a id="A/C Services" onClick={this.onSelect} href="#" className="list-group-item">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <h4 className="list-group-item-heading">A/C Service</h4>
                                            <p className="list-group-item-text"></p>
                                        </div>
                                        <div className="col-sm-4">
                                            <h4>starting at $69.99</h4>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Services;