import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {
    getAvailableWorkplaces,
    setWorkplaceId,
    setNotListedModal
} from '../../../../../../redux/actions/product/serviceform/workplaces.actions';
import {setDate} from '../../../../../../redux/actions/product/serviceform/dates.actions';
import {setServices} from '../../../../../../redux/actions/product/serviceform/services.actions';
import ModalNotListed from './modalnotlisted';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {greenA400} from 'material-ui/styles/colors';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    selectFieldContainer: {
        textAlign: 'center'
    },
    selectField: {
        marginBottom: 10
    }
};

var SelectWorkplace = React.createClass({
    componentDidMount: function () {
        this.props.getAvailableWorkplaces();
    },
    handleChange: function (e, index, selected_value) {
        if (selected_value === 'NotListed') {
            this.props.setNotListedModal(true);
            return;
        }
        this.props.setWorkplaceId(selected_value);
        this.props.clearServicesAndDate();

    },
    render: function () {
        if (this.props.isLoading) {
            return (<div className="row">
                <div className="col-sm-12"><Paper style={styles.paper}><LoadingSpinner/></Paper></div>
            </div>);
        }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <h4>Select your workplace {this.props.workplace_id !== '' ? <CheckCircle style={{fill:greenA400}}/>: ''}</h4>
                            <div style={styles.selectFieldContainer}>
                                <SelectField
                                    value={this.props.workplace_id}
                                    onChange={this.handleChange}
                                    style={styles.selectField}
                                >
                                    <MenuItem value={''} primaryText="Select Your Workplace" disabled={true}/>
                                    {this.props.availableWorkplaces.map(function (workplace) {
                                        return <MenuItem key={workplace._id} value={workplace._id}
                                                         primaryText={workplace.name}/>
                                    })}
                                    <MenuItem value={'NotListed'} primaryText="My Workplace Isn't Listed"/>
                                </SelectField>
                            </div>
                        </div>
                    </Paper>
                </div>
                <ModalNotListed/>
            </div>
        );
    }
});

SelectWorkplace.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    availableWorkplaces: React.PropTypes.array.isRequired,
    workplace_id: React.PropTypes.string.isRequired,
    getAvailableWorkplaces: React.PropTypes.func.isRequired,
    setWorkplaceId: React.PropTypes.func.isRequired,
    clearServicesAndDate: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.product.serviceform.ui.selectworkplace.isLoading || false,
        availableWorkplaces: state.product.serviceform.ui.selectworkplace.availableWorkplaces || [],
        workplace_id: state.product.serviceform.body.workplace_id || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAvailableWorkplaces: ()=> {
            dispatch(getAvailableWorkplaces());
        },
        setWorkplaceId: (id)=> {
            dispatch(setWorkplaceId(id));
        },
        setNotListedModal: (bool)=> {
            dispatch(setNotListedModal(bool))
        },
        clearServicesAndDate: ()=>{
            dispatch(setDate(null));
            dispatch(setServices(['']));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectWorkplace);