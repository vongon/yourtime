import React from 'react';
import {connect} from 'react-redux';
import {formSetService, formSetServiceErrorText} from '../../../redux/actions/serviceform.actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, MakeSelectable} from 'material-ui/List';
import AutoListItem from '../../../components/product/serviceform/autolistitem';
import $ from 'jquery';

const styles = {
    radioButton: {
        marginTop: 16,
    },
    nestedListItems: {
        paddingLeft: 16,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        marginTop: -20,
        marginLeft: 0
    },
    dialog: {
        title: {
            marginBottom: 0
        },
        actionsContainer: {
            marginTop: 0
        }
    }
};

let SelectableList = MakeSelectable(List);

var ModalServices = React.createClass({
    getInitialState: function () {
        return {
            debounced: false
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if(this.props.open === false && nextProps.open === true){
            this.setState({debounced: false});
            var self = this;
            setTimeout(function(){

                self.setState({debounced: true});
            },400);
        }
    },
    selectHandler: function (value, service) {
        if(this.state.debounced){
            this.props.setService(service);
            this.props.setServiceErrorText('');
        }
    },
    render: function () {
        var listItems = [];
        var selectedWorkplace = this.props.selectedWorkplace;
        var selectedService = this.props.selectedService;
        var self = this;
        this.props.availableServices.map(function (service) {
            if (service.workplace_id === selectedWorkplace._id) {
                listItems.push(
                    <AutoListItem
                        key={service._id}
                        service={service}
                        value={service}
                        selectHandler={self.selectHandler}
                        selected={service._id === selectedService._id}
                    />
                );
            }
        });

        var actions = [
            <FlatButton
                label="Cancel"
                onTouchTap={this.props.onRequestClose}
            />,
            <FlatButton
                disabled={$.isEmptyObject(this.props.selectedService)}
                label="Select"
                primary={true}
                onTouchTap={this.props.onRequestClose}
            />,
        ];

        return (
            <Dialog
                title="Select an Auto Service"
                actions={actions}
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                titleStyle={styles.dialog.title}
                actionsContainerStyle={styles.dialog.actionsContainer}
            >
                <SelectableList>
                    {listItems.map(function (item) {
                        return item
                    })}
                </SelectableList>
            </Dialog>
        );
    }
});

ModalServices.propTypes = {
    selectedWorkplace: React.PropTypes.object.isRequired,
    selectedService: React.PropTypes.object.isRequired,
    setService: React.PropTypes.func.isRequired,
    setServiceErrorText: React.PropTypes.func.isRequired,
    availableServices: React.PropTypes.array.isRequired,
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        selectedWorkplace: state.serviceform.body.workplace,
        selectedService: state.serviceform.body.service || {},
        availableServices: state.serviceform.ui.availableServices || []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setService: (service) => {
            dispatch(formSetService(service))
        },
        setServiceErrorText: (text) => {
            dispatch(formSetServiceErrorText(text));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalServices);