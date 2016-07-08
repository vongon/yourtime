import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {adminCreateLocation} from '../../../../redux/actions/admin/locations.actions';

var ModalCreate = React.createClass({
    getInitialState: function () {
        return {
            location: {
                name: ''
            }
        }
    },
    render: function () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={()=>{
                    this.props.onRequestSubmit(this.state.location);
                    this.props.onRequestClose();
                    }
                }
            />
        ];
        var location = this.state.location;
        return (
            <Dialog
                title="Create Location"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input
                            className="form-control"
                            placeholder="Enter name of location"
                            value={location.name}
                            onChange={
                            (e)=>{
                                this.setState({
                                    location : {
                                        ...location,
                                        name: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                </div>
            </Dialog>
        );
    }
});

ModalCreate.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestSubmit: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onRequestSubmit: (location) => {
            dispatch(adminCreateLocation(location));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);