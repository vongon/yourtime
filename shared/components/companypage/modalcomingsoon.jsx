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
                    <h3>YourTime services are coming very very soon! :)</h3>
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