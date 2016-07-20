import React from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Settings from 'material-ui/svg-icons/action/settings';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import LoadingSpinner from '../../../../../components/product/loadingspinner';
import {Link} from 'react-router';
import { getData, setDiscountCode, submitServiceformBody } from '../../../../../redux/actions/product/serviceform/overview.actions';
import SubmitSuccess from './submitsuccess';
import moment from 'moment';

const styles = {
    paper: {
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    td: {
        borderTop: '0px',
        verticalAlign: 'middle'
    },
    discountCodeInput: {
        maxWidth: 200
    }
};

var Overview = React.createClass({
    componentDidMount: function(){
        this.props.getData();
    },
    getTotal: function(){
        var services = this.props.services_objects;
        var total = 0;
        for(var i=0; i<services.length; i++){
            var service = services[i];
            total += service.price;
        }
        return total;
    },
    render: function () {
        if (this.props.isLoading) {
            return (<div className="row"><div className="col-sm-12"><Paper style={styles.paper}><LoadingSpinner/></Paper></div></div>);
        }
        if (this.props.submitSuccess){
            return (<SubmitSuccess/>)
        }
        return (
            <div className="row">
                <div className="col-sm-12">
                    <Paper style={styles.paper}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>SUMMARY</h4>
                                    <Divider/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-11">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <td className="col-sm-3"></td>
                                            <td className="col-sm-6"></td>
                                            <td className="col-sm-3"></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td style={styles.td}><h5>WORKPLACE:</h5></td>
                                            <td style={styles.td}>{this.props.workplace_name || 'no workplace found'}</td>
                                        </tr>
                                        <tr>
                                            <td style={styles.td}><h5>DATE:</h5></td>
                                            <td style={styles.td}>{this.props.date ? moment(this.props.date).format('dddd [-] ll') : 'no date found'}
                                                <Link to="/app/book">
                                                    <FlatButton
                                                        onTouchTap={this.props.resetForm}
                                                        icon={<Settings/>}
                                                        style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.td}><h5>VEHICLE:</h5></td>
                                            <td style={styles.td}>{this.props.vehicle_name || 'no vehicle found'}
                                                <Link to="/app/book">
                                                    <FlatButton
                                                        onTouchTap={this.props.resetForm}
                                                        icon={<Settings/>}
                                                        style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>SERVICES</h4>
                                    <Divider/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-11">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <td className="col-sm-3"></td>
                                            <td className="col-sm-6"></td>
                                            <td className="col-sm-3"></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.services_objects.map(
                                            (service)=>{
                                                return <tr key={service._id}>
                                                    <td style={styles.td}>{service.name}</td>
                                                    <td style={styles.td}>{'$ '+service.price}</td>
                                                    <td style={styles.td}>
                                                        <Link to="/app/book">
                                                            <FlatButton
                                                                onTouchTap={this.props.resetForm}
                                                                icon={<Settings/>}
                                                                style={{minWidth:36, marginLeft:10, color: '#AAA'}}
                                                            />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            }
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>PAYMENT</h4>
                                    <Divider/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-11">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <td className="col-sm-3"></td>
                                            <td className="col-sm-9"></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td style={styles.td}><h5>DISCOUNT CODE:</h5></td>
                                            <td style={styles.td}>
                                                <input
                                                    placeholder="optional discount code"
                                                    className="form-control"
                                                    value={this.props.discount_code}
                                                    onChange={(e)=>{
                                                        var code = e.target.value;
                                                        this.props.setDiscountCode(code);
                                                    }}
                                                    style={styles.discountCodeInput}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={styles.td}><h5>TOTAL:</h5></td>
                                            <td style={styles.td}>{'$ '+this.getTotal()}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Link to="/app/book">
                                <RaisedButton
                                    style={styles.button}
                                    label="Go Back"
                                    icon={<BackIcon/>}
                                />
                            </Link>
                            <RaisedButton
                                style={styles.button}
                                primary={true}
                                label={this.props.submitIsLoading ? "Submitting...":"Order & Pay"}
                                icon={this.props.submitIsLoading ? null : <DoneIcon/>}
                                onTouchTap={this.props.submit}
                                disabled={this.props.submitIsLoading}
                            />
                        </div>
                    </Paper>
                    <Divider style={{marginTop:20, marginBottom:20}}/>
                </div>
            </div>
        );
    }
});

Overview.propTypes = {
    lock: React.PropTypes.object.isRequired,
    isLoading: React.PropTypes.bool.isRequired,
    submitIsLoading: React.PropTypes.bool.isRequired,
    submitSuccess: React.PropTypes.bool.isRequired,
    workplace_name: React.PropTypes.string,
    vehicle_name: React.PropTypes.string,
    date: React.PropTypes.string,
    services_objects: React.PropTypes.array.isRequired,
    discount_code: React.PropTypes.string.isRequired,

    getData: React.PropTypes.func.isRequired,
    setDiscountCode: React.PropTypes.func.isRequired,
    submit: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lock: state.auth.lock,
        isLoading: state.product.serviceform.ui.overview.isLoading || false,
        submitIsLoading: state.product.serviceform.ui.overview.submitIsLoading || false,
        submitSuccess: state.product.serviceform.ui.overview.submitSuccess || false,
        workplace_name: state.product.serviceform.ui.overview.workplace_name || null,
        vehicle_name: state.product.serviceform.ui.overview.vehicle_name || null,
        date: state.product.serviceform.ui.overview.date || null,
        services_objects: state.product.serviceform.ui.overview.services_objects || [],
        discount_code: state.product.serviceform.ui.overview.discount_code || ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: ()=>{
            dispatch(getData());
        },
        setDiscountCode: (discount_code)=>{
            dispatch(setDiscountCode(discount_code));
        },
        submit: ()=>{
            dispatch(submitServiceformBody());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);