import React from 'react';
import {connect} from 'react-redux';
import ModalNotListed from '../../../components/product/serviceform/modalnotlisted';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { formSetWorkplace,
    formSetNotListedModal,
    formSetStep,
    formSetService,
    formSetDate,
    formSetWorkplaceErrorText } from '../../../redux/actions/serviceform.actions';



var ChooseWorkplace = React.createClass({
    handleChange(event, index, value){
        var selection = value;
        if (selection === 'NotListed') {
            this.props.setNotListedModal(true);
            return;
        }
        this.props.setWorkplaceErrorText('');
        this.props.setWorkplace(selection);
        this.props.setService(null); //clear service if workplace is changed
        this.props.setDate(null); //clear date if workplace is changed
    },
    onRequestNext: function(){
        var DropdownSelection = this.props.workplace;
        if (DropdownSelection === '' || typeof DropdownSelection === 'undefined') {
            this.props.setWorkplaceErrorText('please select a workplace');
        } else {
            this.props.setStep('chooseService');
        }
    },
    render: function () {
        var DropdownSelection = this.props.workplace;
        if (DropdownSelection === '' || typeof DropdownSelection === 'undefined') {
            DropdownSelection = 'default';
        }
        return (
            <div>
                <SelectField
                    value={DropdownSelection}
                    onChange={this.handleChange}
                    errorText={this.props.workplaceErrorText}
                >
                    <MenuItem value={'default'} primaryText="Select Your Workplace" disabled={true}/>
                    {this.props.availableWorkplaces.map(function(workplace){
                        return <MenuItem key={workplace._id} value={workplace} primaryText={workplace.name} />
                    })}
                    <MenuItem value={'NotListed'} primaryText="My Workplace Isn't Listed"/>
                </SelectField>
                <div>
                    <RaisedButton
                        label={'Next'}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        primary={true}
                        onTouchTap={this.onRequestNext}
                        style={{marginRight: 12, marginTop: 12}}
                    />
                </div>
                <ModalNotListed
                    open={this.props.notListedModal}
                    onRequestClose={()=>{this.props.setNotListedModal(false)}}/>
            </div>
        );
    }
});

ChooseWorkplace.propTypes = {
    availableWorkplaces: React.PropTypes.array.isRequired,
    workplace: React.PropTypes.any.isRequired,
    workplaceErrorText: React.PropTypes.string.isRequired,
    notListedModal: React.PropTypes.bool.isRequired,

    setStep: React.PropTypes.func.isRequired,
    setWorkplace: React.PropTypes.func.isRequired,
    setWorkplaceErrorText: React.PropTypes.func.isRequired,
    setNotListedModal: React.PropTypes.func.isRequired,
    setService: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps){
    return {
        availableWorkplaces: state.serviceform.ui.availableWorkplaces || [],
        workplace: state.serviceform.body.workplace || '',
        workplaceErrorText: state.serviceform.ui.workplaceErrorText || '',
        notListedModal: state.serviceform.ui.notListedModal || false
    };
}

function mapDispatchToProps(dispatch){
    return {
        setStep: (stepName) => {
            dispatch(formSetStep(stepName))
        },
        setWorkplace: (workplace) => {
            dispatch(formSetWorkplace(workplace))
        },
        setWorkplaceErrorText: (text) => {
            dispatch(formSetWorkplaceErrorText(text))
        },
        setNotListedModal: (bool) => {
            dispatch(formSetNotListedModal(bool))
        },
        setService: (service) => {
            dispatch(formSetService(service))
        },
        setDate: (date) => {
            dispatch(formSetDate(date))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseWorkplace);