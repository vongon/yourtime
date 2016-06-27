import React from 'react';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import {grey600, grey300, grey100} from 'material-ui/styles/colors';


const styles = {
    listItem: {
        natural: {
            backgroundColor: '#FFF'
        },
        hover: {
            backgroundColor: grey100
        },
        selected: {
            backgroundColor: grey300
        }
    },
    price: {
        color: grey600,
        fontSize: 14,
        fontWeight: 'lighter'
    },
    description: {
        color: grey600,
        fontSize: 14,
        fontWeight: 'lighter'
    }
};

var AutoListItem = React.createClass({
    getDefaultProps: function () {
        return {
            service: {
                _id: 'mongoid-342341923#43234',
                name: 'Example: Mobil Express Oil Change',
                price: 49.95,
                description: 'Example: Express oil change with conventional oil, includes full-service quality check of fluids and filters!'
            }
        }
    },
    getInitialState: function () {
        return {
            expanded: false,
            hover: false
        }
    },
    render: function () {
        var service = this.props.service;

        const MoreButton = <IconButton
            onTouchTap={()=>{this.setState({expanded: true})}}
        >
            <ExpandMore />
        </IconButton>;

        const LessButton = <IconButton
            onTouchTap={()=>{this.setState({expanded: false})}}
        >
            <ExpandLess />
        </IconButton>;

        const Description = <div className="row">
            <div className="col-xs-12">
                <p style={styles.description}>{service.description}</p>
            </div>
        </div>;

        return (
            <div>
                <ListItem
                    value={this.props.value}
                    style={this.props.selected ? styles.listItem.selected : (this.state.hover ? styles.listItem.hover : styles.listItem.natural)}
                    onMouseEnter={()=>{this.setState({hover: true})}}
                    onMouseLeave={()=>{this.setState({hover: false})}}
                    onTouchTap={()=>{this.props.selectHandler(this.props.value, service)}}
                >
                    <div className="container-fluid" style={{padding:0}}>
                        <div className="row">
                            <div className="col-sm-10">
                                <p>{service.name}</p>
                                <p style={styles.price}>{'$' + String(service.price)}</p>
                            </div>
                            <div className="col-sm-2">
                                {this.state.expanded ? LessButton : MoreButton }
                            </div>
                        </div>
                        {this.state.expanded && Description}
                    </div>
                </ListItem>
                <Divider />
            </div>
        );
    }
});

AutoListItem.propTypes = {
    selected: React.PropTypes.bool.isRequired,
    value: React.PropTypes.any.isRequired,
    selectHandler: React.PropTypes.func,
    service: React.PropTypes.object
};

export default AutoListItem;