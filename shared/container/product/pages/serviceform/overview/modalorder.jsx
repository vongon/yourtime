import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {adminCreateWorkplace} from '../../../../redux/actions/admin/workplaces.actions';

var ModalCreate = React.createClass({
    getInitialState: function () {
        return {
            workplace: {
                name: '',
                location_id: ''
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
                    this.props.onRequestSubmit(this.state.workplace);
                    this.props.onRequestClose();
                    }
                }
            />
        ];
        var workplace = this.state.workplace;
        return (
            <Dialog
                title="Create Workplace"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input
                            className="form-control"
                            placeholder="Enter name of workplace"
                            value={workplace.name}
                            onChange={
                            (e)=>{
                                this.setState({
                                    workplace : {
                                        ...workplace,
                                        name: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    <div className="form-group">
                        <label for="location">Location</label>
                        <select
                            className="form-control"
                            value={workplace.location_id}
                            onChange={
                                (e)=>{
                                    console.log('selected a value');
                                    this.setState({
                                        workplace: {
                                            ...workplace,
                                            location_id: e.target.value
                                        }
                                    });
                                }
                            }
                        >
                            <option value=''></option>
                            {this.props.locations.map(
                                function(location){
                                    return <option
                                        key={location._id}
                                        value={location._id}>
                                        {location.name + ' -- ' + location._id}
                                    </option>
                                }
                            )}
                        </select>
                    </div>
                </div>
            </Dialog>
        );
    }
});

ModalCreate.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestSubmit: React.PropTypes.func.isRequired,
    locations: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        locations: state.admin.locations.objects || []
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onRequestSubmit: (workplace) => {
            dispatch(adminCreateWorkplace(workplace));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);