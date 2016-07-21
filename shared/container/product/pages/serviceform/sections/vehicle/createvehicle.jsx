import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {setShowCreateView, setTabValue, postNewVehicle, addNewVehicle} from '../../../../../../redux/actions/product/serviceform/vehicles.actions';
import MakesTab from './tabs/makes';
import ModelsTab from './tabs/models';
import YearsTab from './tabs/years';
import StylesTab from './tabs/styles';
import AddIcon from 'material-ui/svg-icons/content/add'


const styles = {
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
        overflow: 'hidden'
    },
    tabItemContainer: {
        backgroundColor: '#eee',
        color: '#333'
    },
    tabHeader:{
        color: '#333'
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
                <Tabs
                    style={styles.tabs}
                    tabItemContainerStyle={styles.tabItemContainer}
                    value={this.props.tabValue}
                    onChange={this.onTabChange}
                >
                    <Tab label={this.props.selectedMake || "(Make)"}
                         value="make"
                        style={styles.tabHeader}
                    >
                        <MakesTab
                            availableMakes={this.props.availableMakes}
                        />
                    </Tab>

                    <Tab label={this.props.selectedModel || "(Model)"}
                         value="model"
                         style={styles.tabHeader}
                    >
                        <ModelsTab />
                    </Tab>
                    <Tab
                        label={this.props.selectedYear || "(Year)"}
                        value="year"
                        style={styles.tabHeader}
                    >
                        <YearsTab />
                    </Tab>
                    <Tab
                        label={this.props.selectedStyle || "(Style)"}
                        value="style"
                        style={styles.tabHeader}
                    >
                        <StylesTab/>
                    </Tab>
                </Tabs>

                <div className="row">
                    <div
                        className="col-sm-12"
                        style={styles.buttonsCol}
                    >
                        {this.props.availableVehicles.length > 0 ?
                            <RaisedButton
                                style={styles.buttons}
                                label="Close"
                                onTouchTap={this.props.closeCreateView}
                            /> : ''
                        }
                        <RaisedButton
                            icon={<AddIcon/>}
                            style={styles.buttons}
                            label="Add Vehicle"
                            disabled={this.props.newVehicle ? false : true}
                            primary={true}
                            onTouchTap={this.props.addNewVehicle}
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

    closeCreateView: React.PropTypes.func.isRequired,
    setTabValue: React.PropTypes.func.isRequired,
    addNewVehicle: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        visible: ownProps.visible,
        availableMakes: state.product.serviceform.ui.selectvehicle.availableMakes || [],
        tabValue : state.product.serviceform.ui.selectvehicle.tab_value || 'make',
        availableVehicles: state.product.serviceform.ui.selectvehicle.availableVehicles || [],

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
        addNewVehicle:()=>{
            dispatch(addNewVehicle());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehicle);