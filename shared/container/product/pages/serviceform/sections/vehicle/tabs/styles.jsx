import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {setStyle, setNewVehicle} from '../../../../../../../redux/actions/product/serviceform/vehicles.actions';


var StylesTab = React.createClass({
    getInitialState: function () {
        return {
            search_make: ''
        }
    },
    shouldHighlight: function (name) {
        return name.toLowerCase().indexOf(this.state.search_make.toLowerCase()) > -1 && this.state.search_make !== '';
    },
    shouldDisable: function (name) {
        return name.toLowerCase().indexOf(this.state.search_make.toLowerCase()) === -1;
    },
    onSelect: function (style) {
        this.props.setStyle(style.trim);
        this.props.setNewVehicle(style);
    },
    render: function () {
        if (this.props.isLoading) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <h5>Loading...</h5>
                    </div>
                </div>
            </div>);
        }

        if (!this.props.availableStyles) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <h5>Please Select a Make, Model, and Year first.</h5>
                    </div>
                </div>
            </div>);
        }

        var styles = this.props.availableStyles;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <div className="input-group">
                            <div className="input-group-addon"><SearchIcon/></div>
                            <input
                                style={{height:40}}
                                className="form-control"
                                placeholder="2016, 2009, 1990"
                                value={this.state.search_make}
                                onChange={(e)=>{this.setState({search_make: e.target.value})}}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <p style={{margin:10, fontStyle:'italic', fontWeight:200}}>Not sure which one? That's okay just make your best guess and we'll correct it later!</p>
                    </div>

                    {styles.map((style, idx)=> {
                        return (<div className="col-sm-6" key={style.id}>
                                <FlatButton
                                    key={style.id}
                                    onTouchTap={()=>{this.onSelect(style)}}
                                    label={style.name}
                                    primary={this.shouldHighlight(String(style.name))}
                                    disabled={this.shouldDisable(String(style.name))}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

StylesTab.propTypes = {
    availableStyles: React.PropTypes.array,
    isLoading: React.PropTypes.bool.isRequired,
    setStyle: React.PropTypes.func.isRequired,
    setNewVehicle: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        availableStyles: state.product.serviceform.ui.selectvehicle.availableStyles,
        isLoading: state.product.serviceform.ui.selectvehicle.stylesIsLoading || false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setStyle: (style)=> {
            dispatch(setStyle(style));
        },
        setNewVehicle: (obj)=>{
            dispatch(setNewVehicle(obj));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StylesTab);