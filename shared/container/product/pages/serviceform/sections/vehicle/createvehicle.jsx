import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {setShowCreateView, setTabValue, postNewVehicle} from '../../../../../../redux/actions/product/serviceform/vehicles.actions';
import MakesTab from './tabs/makes';
import ModelsTab from './tabs/models';
import YearsTab from './tabs/years';
import StylesTab from './tabs/styles';


const styles = {
    mainHeader: {
        marginTop: 0
    },
    selectHeader: {
        marginTop: 20
    },
    buttonsCol: {
        textAlign: 'center'
    },
    buttons: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    tabs: {
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid #ccc',
        backgroundColor: '#f8f8f8'
    }
};

var CreateVehicle = React.createClass({
    onTabChange: function(value){
        if(typeof value === "string") {
            //This event was getting called for onChange events in search box
            //I think it is a material-ui bug
            this.props.setTabValue(value);
        }
    },
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        return (
            <div className="">
                <div className="row">
                    <div className="col-sm-12">
                        <h4 style={styles.mainHeader}>New Vehicle</h4>
                    </div>
                </div>

                <Tabs
                    style={styles.tabs}
                    value={this.props.tabValue}
                    onChange={this.onTabChange}
                >
                    <Tab label={this.props.selectedMake || "(Make)"} value="make">
                        <MakesTab
                            availableMakes={this.props.availableMakes}
                        />
                    </Tab>

                    <Tab label={this.props.selectedModel || "(Model)"}
                         value="model"
                    >
                        <ModelsTab />
                    </Tab>
                    <Tab
                        label={this.props.selectedYear || "(Year)"}
                        value="year"
                    >
                        <YearsTab />
                    </Tab>
                    <Tab
                        label={this.props.selectedStyle || "(Style)"}
                        value="style"
                    >
                        <StylesTab/>
                    </Tab>
                </Tabs>

                <div className="row">
                    <div
                        className="col-sm-12"
                        style={styles.buttonsCol}
                    >
                        <RaisedButton
                            style={styles.buttons}
                            label="Cancel"
                            onTouchTap={this.props.closeCreateView}
                        />
                        <RaisedButton
                            style={styles.buttons}
                            label="+ Add Vehicle"
                            disabled={this.props.newVehicle ? false : true}
                            primary={true}
                            onTouchTap={this.props.postNewVehicle}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

CreateVehicle.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    availableMakes: React.PropTypes.array.isRequired,
    tabValue: React.PropTypes.string.isRequired,
    selectedMake: React.PropTypes.string,
    selectedModel: React.PropTypes.string,
    selectedYear: React.PropTypes.string,
    selectedStyle: React.PropTypes.string,

    newVehicle: React.PropTypes.object,

    closeCreateView: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        visible: ownProps.visible,
        availableMakes: state.product.serviceform.ui.selectvehicle.availableMakes || [],
        tabValue : state.product.serviceform.ui.selectvehicle.tab_value || 'make',

        selectedMake: state.product.serviceform.ui.selectvehicle.make,
        selectedModel: state.product.serviceform.ui.selectvehicle.model,
        selectedYear: state.product.serviceform.ui.selectvehicle.year,
        selectedStyle: state.product.serviceform.ui.selectvehicle.style,

        newVehicle: state.product.serviceform.ui.selectvehicle.newVehicle
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeCreateView: ()=> {
            dispatch(setShowCreateView(false));
        },
        setTabValue: (tab_value)=>{
            dispatch(setTabValue(tab_value));
        },
        postNewVehicle: ()=>{
            dispatch(postNewVehicle());
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicle);