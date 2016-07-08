import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { adminDeleteService, adminEditService } from '../../../../redux/actions/admin/services.actions';
import { red500 } from 'material-ui/styles/colors';


var ModalCreate = React.createClass({
    getInitialState: function () {
        return {
            service: this.props.service,
            deleteRequested: false
        }
    },
    onRequestDelete: function () {
        console.log('delete requested');
        if (!this.state.deleteRequested) {
            this.setState({deleteRequested: true});
        } else {
            this.props.deleteService(this.props.service._id);
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
                    this.props.onRequestSubmit(this.state.service);
                    this.props.onRequestClose();
                    }
                }
            />
        ];
        var service = this.state.service;
        return (
            <Dialog
                title="Edit Service"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                <div style={{marginTop:20}}>
                    {/*------------------------Name----------------------------------*/}
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input
                            className="form-control"
                            placeholder="Full Service Oil Change"
                            value={service.name}
                            onChange={
                            (e)=>{
                                this.setState({
                                    service : {
                                        ...service,
                                        name: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    {/*------------------------Type----------------------------------*/}
                    <div className="form-group">
                        <label for="name">type</label>
                        <select
                            className="form-control"
                            value={service.type}
                            onChange={
                                (e)=>{
                                    this.setState({
                                        service: {
                                            ...service,
                                            type: e.target.value
                                        }
                                    });
                                }
                            }
                        >
                            <option value=''></option>
                            <option value='auto'>auto</option>
                            }
                            )}
                        </select>
                    </div>
                    {/*------------------------Category----------------------------------*/}
                    <div className="form-group">
                        <label for="name">category</label>
                        <select
                            className="form-control"
                            value={service.category}
                            onChange={
                                (e)=>{
                                    this.setState({
                                        service: {
                                            ...service,
                                            category: e.target.value
                                        }
                                    });
                                }
                            }
                        >
                            <option value=''></option>
                            <option value='oil change'>oil change</option>
                            <option value='tire rotation'>tire rotation</option>
                            <option value='inspection'>inspection</option>
                        </select>
                    </div>
                    {/*------------------------Description----------------------------------*/}
                    <div className="form-group">
                        <label for="name">Description</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Really excellent quality super duper hi-fi job for low price!"
                            value={service.description}
                            onChange={
                            (e)=>{
                                this.setState({
                                    service : {
                                        ...service,
                                        description: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    {/*------------------------Price----------------------------------*/}
                    <div className="form-group">
                        <label for="name">Price</label>
                        <input
                            className="form-control"
                            placeholder="69.95"
                            value={service.price}
                            onChange={
                            (e)=>{
                                this.setState({
                                    service : {
                                        ...service,
                                        price: e.target.value
                                        }
                                });
                            }
                        }/>
                    </div>
                    {/*------------------------Workplace----------------------------------*/}
                    <div className="form-group">
                        <label for="location">Workplace</label>
                        <select
                            className="form-control"
                            value={service.workplace_id}
                            onChange={
                                (e)=>{
                                    this.setState({
                                        service: {
                                            ...service,
                                            workplace_id: e.target.value
                                        }
                                    });
                                }
                            }
                        >
                            <option value=''></option>
                            {this.props.workplaces.map(
                                function(workplace){
                                    return <option
                                        key={workplace._id}
                                        value={workplace._id}>
                                        {workplace.name + ' -- ' + workplace._id}
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
    deleteService: React.PropTypes.func.isRequired,
    workplaces: React.PropTypes.array.isRequired,
    service: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        workplaces: state.admin.workplaces.objects || [],
        service: ownProps.service || {}
    }
}
function mapDispatchToProps(dispatch) {
    return {
        deleteService: (id)=>{
            dispatch(adminDeleteService(id));
        },
        onRequestSubmit: (service) => {
            dispatch(adminEditService(service));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreate);