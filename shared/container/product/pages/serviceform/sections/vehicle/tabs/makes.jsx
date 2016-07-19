import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {setMake, setTabValue, setAvailableModels, setModel, setYear, setStyle} from '../../../../../../../redux/actions/product/serviceform/vehicles.actions';



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
    checkbox: {
        style: {
            marginLeft: 10,
            marginTop: 10
        },
        labelStyle: {
            fontWeight: 100
        }
    },
    tabs: {
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid #ccc',
        backgroundColor: '#f8f8f8'
    }
};

var MakesTab = React.createClass({
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
    onSelect: function(make){
        this.props.setMake(make.niceName);
        this.props.setAvailableModels(make.models);
        this.props.setTabValue('model');
        this.props.reset();
    },
    render: function () {
        var makes = this.props.availableMakes;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <div className="input-group">
                            <div className="input-group-addon"><SearchIcon/></div>
                            <input
                                style={{height:40}}
                                className="form-control"
                                placeholder="Toyota, Nissan, Audi ..."
                                value={this.state.search_make}
                                onChange={(e)=>{this.setState({search_make: e.target.value})}}
                            />
                        </div>
                    </div>

                    <div className="col-sm-3">
                        {makes.slice(0, makes.length * .25).map((make, idx)=> {
                            return (<div key={make.id}>
                                    <FlatButton
                                        key={make.id}
                                        onTouchTap={()=>{this.onSelect(make)}}
                                        label={make.name}
                                        primary={this.shouldHighlight(make.name)}
                                        disabled={this.shouldDisable(make.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="col-sm-3">
                        {makes.slice(makes.length * .25, makes.length * .5).map((make, idx)=> {
                            return (<div key={make.id}>
                                    <FlatButton
                                        onTouchTap={()=>{this.onSelect(make)}}
                                        label={make.name}
                                        primary={this.shouldHighlight(make.name)}
                                        disabled={this.shouldDisable(make.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="col-sm-3">
                        {makes.slice(makes.length * .5, makes.length * .75).map((make, idx)=> {
                            return (<div key={make.id}>
                                    <FlatButton
                                        onTouchTap={()=>{this.onSelect(make)}}
                                        label={make.name}
                                        primary={this.shouldHighlight(make.name)}
                                        disabled={this.shouldDisable(make.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="col-sm-3">
                        {makes.slice(makes.length * .75).map((make, idx)=> {
                            return (<div key={make.id}>
                                    <FlatButton
                                        onTouchTap={()=>{this.onSelect(make)}}
                                        label={make.name}
                                        primary={this.shouldHighlight(make.name)}
                                        disabled={this.shouldDisable(make.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        );
    }
});

MakesTab.propTypes = {
    availableMakes: React.PropTypes.array.isRequired,
    setMake: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setMake: (make)=>{
            dispatch(setMake(make));
        },
        setTabValue: (tab_value)=>{
            dispatch(setTabValue(tab_value));
        },
        setAvailableModels: (models)=>{
            dispatch(setAvailableModels(models));
        },
        reset: ()=>{
            dispatch(setModel(null));
            dispatch(setYear(null));
            dispatch(setStyle(null));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakesTab);