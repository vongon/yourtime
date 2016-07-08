import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {adminEditWorkplace, adminDeleteWorkplace} from '../../../../redux/actions/admin/workplaces.actions';
import { red500 } from 'material-ui/styles/colors';


var ModalCreate = React.createClass({
    getInitialState: function () {
        return {
            workplace: this.props.workplace,
            deleteRequested: false
        }
    },
    onRequestDelete: function () {
        console.log('delete requested');
        if (!this.state.deleteRequested) {
            this.setState({deleteRequested: true});
        } else {
            this.props.deleteWorkplace(this.props.workplace._id);
            this.props.onRequestClose();
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
                label={this.state.deleteRequested ? "Click to confirm delete" : "Delete"}
                primary={false}
                style={this.state.deleteRequested ? {color:red500} : {}}
                onTouchTap={this.onRequestDelete}
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
                title="Edit Workplace"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">id</label>
                        <input type="text"
                               className="form-control disabled"
                               value={workplace._id}
                               readOnly
                               onChange={()=>{}}/>
                    </div>
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
    deleteWorkplace: React.PropTypes.func.isRequired,
    locations: React.PropTypes.array.isRequired,
    workplace: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        locations: state.admin.locations.objects || [],
        workplace: ownProps.workplace || {}
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteWorkplace: (id) => {
            dispatch(adminDeleteWorkplace(id));
        },
        onRequestSubmit: (workplace) => {
            dispatch(adminEditWorkplace(workplace));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);