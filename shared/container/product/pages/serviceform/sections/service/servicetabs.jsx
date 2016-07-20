import React from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import {indigo500, cyan500, blue500} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import OilIcon from 'material-ui/svg-icons/action/opacity';
import TireIcon from 'material-ui/svg-icons/image/camera';
import InspectionIcon from 'material-ui/svg-icons/communication/contact-mail';
import ModalInfo from './modalinfo';


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
    tabHeader: {
        color: '#333'
    },
    infoIcon: {
        fill: '#757575'
    }
};

var ServiceTabs = React.createClass({
    getInitialState: function () {
        var services = this.props.availableServices;
        for(var i=0; i<services.length; i++){
            var service = services[i];
            if(service._id === this.props.serviceId){
                return ({
                    selectedCategory: service.category,
                    selectedName: service.name,
                    tabValue: 'type',
                    showModal: false,
                    modalCategory: null
                });
            }
        }
        return ({
            selectedCategory: null,
            selectedName: null,
            tabValue: 'category',
            showModal: false,
            modalCategory: null
        });
    },
    onTabChange: function (value) {
        if (typeof value === 'string') { //confirm event is for a tab change
            this.setState({tabValue: value});
            if(value === 'category') this.props.setServiceId(''); //reset panel if going back to category
        }
    },
    onCategorySelect: function (category) {
        this.setState({
            selectedCategory: category,
            tabValue: 'type'
        });
    },
    onServiceSelect: function(service_obj){
        this.setState({selectedName: service_obj.name});
        this.props.setServiceId(service_obj._id);
    },
    showModal: function(category){
        console.log('showModal');
        this.setState({
            showModal: true,
            modalCategory: category
        })
    },
    render: function () {
        var oilChangeAvatar = <Avatar icon={<OilIcon />} backgroundColor={indigo500}/>;
        var tireRotationAvatar = <Avatar icon={<TireIcon />} backgroundColor={blue500}/>;
        var inspectionAvatar = <Avatar icon={<InspectionIcon />} backgroundColor={cyan500}/>;
        return (
            <div>
                <Tabs
                    style={styles.tabs}
                    tabItemContainerStyle={styles.tabItemContainer}
                    value={this.state.tabValue}
                    onChange={this.onTabChange}
                >
                    <Tab label={this.state.selectedCategory || "(Category)"}
                         value="category"
                         style={styles.tabHeader}
                    >
                        <List>
                            <ListItem
                                leftAvatar={oilChangeAvatar}
                                rightIconButton={<IconButton onTouchTap={()=>{this.showModal('oil change')}} iconStyle={styles.infoIcon}><ActionInfo/></IconButton>}
                                primaryText="Oil Change"
                                secondaryText={""}
                                onTouchTap={()=>{this.onCategorySelect('oil change')}}
                            />
                            <ListItem
                                leftAvatar={tireRotationAvatar}
                                rightIconButton={<IconButton onTouchTap={()=>{this.showModal('tire rotation')}} iconStyle={styles.infoIcon}><ActionInfo/></IconButton>}
                                primaryText="Tire Rotation"
                                secondaryText=""
                                onTouchTap={()=>{this.onCategorySelect('tire rotation')}}

                            />
                            <ListItem
                                leftAvatar={inspectionAvatar}
                                rightIconButton={<IconButton onTouchTap={()=>{this.showModal('inspection')}} iconStyle={styles.infoIcon}><ActionInfo/></IconButton>}
                                primaryText="Inspection"
                                secondaryText=""
                                onTouchTap={()=>{this.onCategorySelect('inspection')}}

                            />
                        </List>
                    </Tab>

                    <Tab label={this.state.selectedName || "(Type)"}
                         value="type"
                         style={styles.tabHeader}
                    >{!this.state.selectedCategory ? <p style={{margin:20}}>Please select a category first</p> :
                        this.props.serviceId ?
                            <List>
                                {this.props.availableServices.map((service)=> {
                                    if (service._id !== this.props.serviceId) return null;
                                    var avatar;
                                    if (service.category === 'oil change') avatar = oilChangeAvatar;
                                    if (service.category === 'tire rotation') avatar = tireRotationAvatar;
                                    if (service.category === 'inspection') avatar = inspectionAvatar;
                                    return <ListItem
                                        leftAvatar={avatar}
                                        key={service._id}
                                        primaryText={<div><span>{service.name}</span> - <span style={{fontWeight:200}}>${service.price}</span></div>}
                                        secondaryText={service.description}
                                        onTouchTap={()=>{this.onServiceSelect(service)}}
                                        rightIconButton={<IconButton onTouchTap={()=>{this.showModal(service.category)}} iconStyle={styles.infoIcon}><ActionInfo/></IconButton>}
                                    />
                                })}
                            </List>
                            :
                        <List>
                            {this.props.availableServices.map((service)=> {
                                if (service.category !== this.state.selectedCategory) return null;
                                var avatar;
                                if (service.category === 'oil change') avatar = oilChangeAvatar;
                                if (service.category === 'tire rotation') avatar = tireRotationAvatar;
                                if (service.category === 'inspection') avatar = inspectionAvatar;
                                return <ListItem
                                    leftAvatar={avatar}
                                    key={service._id}
                                    primaryText={<div><span>{service.name}</span> - <span style={{fontWeight:200}}>${service.price}</span></div>}
                                    secondaryText={service.description}
                                    onTouchTap={()=>{this.onServiceSelect(service)}}
                                    rightIconButton={<IconButton onTouchTap={()=>{this.showModal(service.category)}} iconStyle={styles.infoIcon}><ActionInfo/></IconButton>}
                                />
                            })}
                        </List>
                    }
                    </Tab>
                </Tabs>
                <ModalInfo
                    open={this.state.showModal}
                    onRequestClose={()=>{this.setState({showModal: false})}}
                    category={this.state.modalCategory}
                />
            </div>

        );
    }
});

Tabs.propTypes = {
    serviceId: React.PropTypes.string.isRequired, //selected service id, could be '' if not yet selected
    availableServices: React.PropTypes.array.isRequired, //filtered for currently selected workplace
    setServiceId: React.PropTypes.string.isRequired //setServiceId(id)
};

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTabs);