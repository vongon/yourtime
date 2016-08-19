import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


var ModalComingSoon = React.createClass({
    propTypes: {
        open: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func.isRequired
    },
    render: function () {

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.onRequestClose}
            />
        ];

        return (
            <Dialog
                title="Coming Soon!"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 timeline-body">
                            <h3 style={{fontWeight: 300, textTransform: 'none', fontSize: 20}}>YourTime services are coming soon! If you are interested in more
                                information, please email us at <a target="_blank" href="mailto:info@yourtime.life">info@yourtime.life</a>
                            </h3>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
});

ModalComingSoon.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired
};

export default ModalComingSoon;