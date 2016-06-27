import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var ModalNotListed = React.createClass({
    propTypes: {
        open: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func.isRequired
    },
    render: function () {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.onRequestClose}
            />,
        ];

        return (
            <Dialog
                title="Request YourTime for your workplace!"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div className="container-fluid">
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Name"
                    />
                    <TextField
                        fullWidth={true}
                        floatingLabelText="Workplace Name"
                    />
                    <TextField
                        fullWidth={true}
                        type="phone"
                        floatingLabelText="Phone"
                    />
                    <TextField
                        fullWidth={true}
                        type="email"
                        floatingLabelText="Email"
                    />
                </div>
            </Dialog>
        );
    }
});

export default ModalNotListed;