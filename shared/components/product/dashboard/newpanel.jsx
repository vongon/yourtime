import React from 'react';
import { Link } from 'react-router';

var NewPanel = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <Link to="/app/book">
                        <div className="panel panel-default" style={this.props.style}>
                            <div className="panel-body container">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h4>
                                            <i  className="fa fa-plus-circle"
                                                aria-hidden="true"
                                                style={{marginRight: 15}}/>
                                            Add New Service
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
});

export default NewPanel;