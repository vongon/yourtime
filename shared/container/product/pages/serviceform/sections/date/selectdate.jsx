import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import LoadingSpinner from '../../../../../../components/product/loadingspinner';
import {getAvailableDates, setDate} from '../../../../../../redux/actions/product/serviceform/dates.actions';
import moment from 'moment';
import ContentAdd from 'material-ui/svg-icons/content/add-circle';
import FlatButton from 'material-ui/FlatButton';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {greenA400} from 'material-ui/styles/colors';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    addButton: {
        minWidth: 36
    },
    cell: {
        verticalAlign: 'middle'
    },
    row: {
        cursor: 'pointer'
    },
    rowSelected: {
        backgroundColor: '#EEE'
    },
    rowDisabled: {
        color: '#AAA'
    },
    tbody: {},
    table: {},
    tableContainer:{
        maxHeight: 400
    }
};

var SelectDate = React.createClass({
    componentDidMount: function () {
        this.props.getAvailableDates();
    },
    selectHandler: function(date){
        console.log('selected date:', date);
        this.props.setDate(date);
    },
    getLocationId: function(){
        var workplaces = this.props.availableWorkplaces;
        var workplace_id = this.props.selectedWorkplaceId;
        console.log('[selectdate] getlocationid()');
        for(var i=0; i<workplaces.length; i++){
            if(workplaces[i]._id === workplace_id){
                return workplaces[i].location_id;
            }
        }
        return null;
    },
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        if (this.props.isLoading) {
            return (<div className="row">
                <div className="col-sm-12"><Paper style={styles.paper}><LoadingSpinner/></Paper></div>
            </div>);
        }
        var self = this;
        var location_id = this.getLocationId();
        console.log('[selectdate] location_id:',location_id);
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <h4>Select a date {this.props.date !== '' ? <CheckCircle style={{fill:greenA400}}/>: ''}</h4>
                            <p style={{color:'#AAA'}}>{this.props.date !== '' ? moment(this.props.date).format('[Selected:] dddd [-] ll') : ''}</p>
                            <div className="table-responsive" style={styles.tableContainer}>
                                <table className="table table-condensed table-hover"
                                    style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th><h5></h5></th>
                                            <th><h5>Date</h5></th>
                                            <th><h5>Spots Available</h5></th>
                                        </tr>
                                    </thead>
                                    <tbody style={styles.tbody}>
                                    {this.props.availableDates.map(
                                        function(day){
                                            if(day.location_id !== location_id) return null;

                                            var rowStyle, spotsLeft, buttonDisabled, clickHandler;
                                            rowStyle = styles.row;
                                            spotsLeft = day.capacity-day.eventCount;
                                            buttonDisabled = false;
                                            clickHandler = ()=>{self.selectHandler(day.date)};

                                            if(day.eventCount >= day.capacity){
                                                //day sold out
                                                rowStyle = styles.rowDisabled;
                                                spotsLeft = 'Sold Out';
                                                buttonDisabled = true;
                                                clickHandler = ()=>{};
                                            } else if(self.props.date === day.date){
                                                //day is currently selected
                                                rowStyle = styles.rowSelected;
                                            }

                                            return <tr key={day._id}
                                                       style={rowStyle}
                                                        onClick={clickHandler}>
                                                <td style={styles.cell}>
                                                    <FlatButton
                                                        primary={true}
                                                        icon={<ContentAdd/>}
                                                        style={styles.addButton}
                                                        onTapTouch={clickHandler}
                                                        disabled={buttonDisabled}
                                                    />
                                                </td>
                                                <td style={styles.cell}>{moment(day.date).format('dddd [-] ll') || 'null'}</td>
                                                <td style={styles.cell}>{spotsLeft}</td>
                                            </tr>
                                        }
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

SelectDate.propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    visible: React.PropTypes.bool.isRequired,
    availableDates: React.PropTypes.array.isRequired,
    date: React.PropTypes.isRequired,
    availableWorkplaces: React.PropTypes.array.isRequired,
    selectedWorkplaceId: React.PropTypes.string.isRequired,
    getAvailableDates: React.PropTypes.func.isRequired,
    setDate: React.PropTypes.func.isRequired

};

function mapStateToProps(state, ownProps) {
    return {
        isLoading: state.product.serviceform.ui.selectdate.isLoading || false,
        visible: ownProps.visible,
        availableDates: state.product.serviceform.ui.selectdate.availableDates || [],
        date: state.product.serviceform.body.date || '',
        availableWorkplaces: state.product.serviceform.ui.selectworkplace.availableWorkplaces || [],
        selectedWorkplaceId: state.product.serviceform.body.workplace_id || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAvailableDates: ()=> {
            dispatch(getAvailableDates());
        },
        setDate: (date)=> {
            dispatch(setDate(date));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);