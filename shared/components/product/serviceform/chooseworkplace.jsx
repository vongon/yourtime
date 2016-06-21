import React from 'react';
import $ from 'jquery';
import Spinner from 'react-spin';
import config from '../../../config';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var Workplace = React.createClass({
    propTypes: {
        isLoading: React.PropTypes.bool,
        workplace: React.PropTypes.string,
        asyncSetWorkplace: React.PropTypes.func.isRequired
    },
    componentDidMount: function () {
        console.log('component did mount');
        var button_width = $('#dropdown-workplace').width();
        console.log('width:',button_width);
        $('#dropdownMenu-Workplace-options').width(button_width);
    },
    onSelect(e){
        var selection = e.target.id;
        console.log('selected: ', selection);
        if(selection === 'NotListed'){
            console.log('show help modal for not listed option');
            return;
        }
        this.props.asyncSetWorkplace(selection);
    },
    render: function () {
        var DropdownText = this.props.workplace;
        if(DropdownText === '' || typeof DropdownText === 'undefined'){
            DropdownText = 'Select My Workplace';
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <DropDownMenu value={1} onChange={this.handleChange} openImmediately={true}>
                            <MenuItem value={1} primaryText="AECOM" />
                            <MenuItem value={2} primaryText="BIZNAZ" />
                            <MenuItem value={3} primaryText="URS" />
                            <MenuItem value={4} primaryText="My Workplace Isn't Listed" />
                        </DropDownMenu>

                        <div className="dropdown-container" style={{textAlign: 'center'}}>
                            <div className="dropdown" id="dropdown-workplace"
                                 style={{display: 'inline-block', marginTop: 30}}>
                                <button className="btn btn-default dropdown-toggle" type="button"
                                        id="dropdownMenu-Workplace" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="true">
                                    <h4 style={{marginTop: 10, marginBottom: 10}}>
                                        {DropdownText} <span className="caret" />
                                    </h4>
                                </button>
                                <ul className="dropdown-menu" id="dropdownMenu-Workplace-options" aria-labelledby="dropdownMenu-Workplace">
                                    <li><a id="AECOM" onClick={this.onSelect}>AECOM</a></li>
                                    <li><a id="BIZNAZ" onClick={this.onSelect}>BIZNAZ</a></li>
                                    <li><a id="URS" onClick={this.onSelect}>URS</a></li>
                                    <li role="separator" className="divider" />
                                    <li><a id="NotListed" onClick={this.onSelect}>My Workplace Isn't Listed</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12" style={{marginTop: 30, marginBottom:30}}>
                        { this.props.isLoading && <Spinner config={config.SpinnerOpts} />}
                    </div>
                </div>
            </div>
        );
    }
});

export default Workplace;