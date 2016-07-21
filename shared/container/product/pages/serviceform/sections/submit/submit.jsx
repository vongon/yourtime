import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link, browserHistory} from 'react-router';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import {setServices} from '../../../../../../redux/actions/product/serviceform/services.actions';

const styles = {
    row: {
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
}

var Services = React.createClass({
    onSubmit: function () {
        var filteredServices = this.props.services.filter((service)=>{
            return service !== '';
        });
        this.props.setServices(filteredServices);
        browserHistory.push('/app/overview');
    },
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        return (
            <div className="row">
                <div className="col-sm-12" style={styles.row}>
                    <RaisedButton
                        onTouchTap={this.onSubmit}
                        style={styles.button}
                        label="Order Overview"
                        primary={true}
                        icon={<ForwardIcon/>}
                    />
                </div>
            </div>
        );
    }
});

Services.propTypes = {
    visible: React.PropTypes.bool.isRequired,
    services: React.PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        visible: ownProps.visible,
        services: state.product.serviceform.body.services || []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setServices: (services) => {
            dispatch(setServices(services));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);