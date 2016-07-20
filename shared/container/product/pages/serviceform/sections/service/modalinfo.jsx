import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';

const OilChange = <div>
    <h1>Oil Change Info</h1>
</div>;

const TireRotation = <div>
    <h1>Tire Rotation Info</h1>
</div>;

const Inspection = <div>
    <h1>Inspection Info</h1>
</div>;

const NotRecognized = <div>
    <h1>Sorry, we have no Info on this Service Category.</h1>
</div>;

var ModalInfo = React.createClass({
    getContent: function(){
        if(this.props.category === 'oil change') return OilChange;
        if(this.props.category === 'tire rotation') return TireRotation;
        if(this.props.category === 'inspection') return Inspection;
        return NotRecognized;
    },
    render: function () {

        const actions = [
            <FlatButton
                label="Back"
                onTouchTap={this.props.onRequestClose}
            />
        ];

        console.log('modal rendered with category:',this.props.category);

        return (
            <Dialog
                title="Details about auto services at YourTime"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
            >
                {this.getContent()}
            </Dialog>
        );
    }
});

ModalInfo.propTypes = {
    open: React.PropTypes.bool.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    category: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalInfo);