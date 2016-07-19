import React from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {setYear, setTabValue, getAvailableStyles, setStyle} from '../../../../../../../redux/actions/product/serviceform/vehicles.actions';


var YearsTab = React.createClass({
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
    onSelect: function (year) {
        this.props.setYear(year.year);
        this.props.setTabValue('style');
        this.props.getAvailableStyles();
        this.props.reset();
    },
    render: function () {
        if (!this.props.availableYears) {
            return (<div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12" style={{marginTop:10}}>
                        <h5>Please Select a Model first.</h5>
                    </div>
                </div>
            </div>);
        }

        var years = this.props.availableYears;
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
                    {years.map((year, idx)=> {
                        return (<div className="col-sm-3" key={year.id}>
                                <FlatButton
                                    key={year.id}
                                    onTouchTap={()=>{this.onSelect(year)}}
                                    label={year.year}
                                    primary={this.shouldHighlight(String(year.year))}
                                    disabled={this.shouldDisable(String(year.year))}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

YearsTab.propTypes = {
    availableYears: React.PropTypes.array,
    setModel: React.PropTypes.func.isRequired,
    setTabValue: React.PropTypes.func.isRequired,
    getAvailableStyles: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        availableYears: state.product.serviceform.ui.selectvehicle.availableYears
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setYear: (year)=> {
            dispatch(setYear(year));
        },
        setTabValue: (tab_value)=> {
            dispatch(setTabValue(tab_value));
        },
        getAvailableStyles: ()=>{
            dispatch(getAvailableStyles());
        },
        reset: ()=>{
            dispatch(setStyle());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YearsTab);