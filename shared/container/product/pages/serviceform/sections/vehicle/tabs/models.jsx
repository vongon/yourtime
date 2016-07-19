import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {setModel, setTabValue, setAvailableYears, setYear, setStyle} from '../../../../../../../redux/actions/product/serviceform/vehicles.actions';


var ModelsTab = React.createClass({
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
    onSelect: function (model) {
        this.props.setModel(model.niceName);
        this.props.setTabValue('year');
        this.props.setAvailableYears(model.years);
        this.props.reset();
    },
    render: function () {
        if (!this.props.availableModels) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <h5>Please Select a Make first.</h5>
                    </div>
                </div>
            </div>);
        }
        
        var models = this.props.availableModels;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <div className="input-group">
                            <div className="input-group-addon"><SearchIcon/></div>
                            <input
                                style={{height:40}}
                                className="form-control"
                                placeholder="Sentra, Camary, Corolla..."
                                value={this.state.search_make}
                                onChange={(e)=>{this.setState({search_make: e.target.value})}}
                            />
                        </div>
                    </div>
                    {models.map((model, idx)=> {
                        return (<div className="col-sm-3" key={model.id}>
                                <FlatButton
                                    key={model.id}
                                    onTouchTap={()=>{this.onSelect(model)}}
                                    label={model.name}
                                    primary={this.shouldHighlight(model.name)}
                                    disabled={this.shouldDisable(model.name)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

ModelsTab.propTypes = {
    availableModels: React.PropTypes.array,
    setModel: React.PropTypes.func.isRequired,
    setTabValue: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        availableModels: state.product.serviceform.ui.selectvehicle.availableModels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setModel: (model)=> {
            dispatch(setModel(model));
        },
        setTabValue: (tab_value)=> {
            dispatch(setTabValue(tab_value));
        },
        setAvailableYears: (years)=>{
            dispatch(setAvailableYears(years));
        },
        reset: ()=>{
            dispatch(setYear(null));
            dispatch(setStyle(null));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelsTab);