import React from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

const styles = {
    row: {
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
}

var Services = React.createClass({
    render: function () {
        if (!this.props.visible) {
            return null;
        }
        return (
            <div className="row">
                <div className="col-sm-12" style={styles.row}>
                    <Link to="/app/overview">
                        <RaisedButton
                            style={styles.button}
                            label="Order Overview"
                            primary={true}
                            icon={<ForwardIcon/>}
                        />
                    </Link>
                </div>
            </div>
        );
    }
});

Services.propTypes = {
    visible: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        visible: ownProps.visible,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);