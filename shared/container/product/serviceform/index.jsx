import React from 'react';
import {connect} from 'react-redux';
import ChooseWorkplace from '../../../components/product/serviceform/chooseworkplace';
import ChooseServices from '../../../components/product/serviceform/chooseservices';
import ChooseDate from '../../../components/product/serviceform/choosedate';
import { formAsyncSetWorkplace, formAsyncSetService } from '../../../redux/actions/serviceform.actions';


var ServiceFormIndex = React.createClass({
    propTypes: {
        stepName: React.PropTypes.oneOf(['chooseWorkplace', 'chooseService', 'chooseDate', 'orderSummary', 'complete']).isRequired
    },
    render: function () {
        var content;
        switch(this.props.stepName){
            case 'chooseWorkplace':
                content = <ChooseWorkplace
                            asyncSetWorkplace={this.props.asyncSetWorkplace}
                            workplace={this.props.workplace}
                            isLoading={this.props.isLoading}/>;
                break;
            case 'chooseService':
                content = <ChooseServices
                            asyncSetService={this.props.asyncSetService}
                            availableServices={this.props.availableServices}
                            isLoading={this.props.isLoading}/>;
                break;
            case 'chooseDate':
                content = <ChooseDate />
                break;
            case 'orderSummary':
                break;
            case 'complete':
                break;
            default:
                console.assert(false, 'did not recognize props.stepName value in ServiceFormIndex');
        }
        return (
            <div>
            { content }
            </div>
        );
    }
});

function mapStateToProps(state, ownProps){
    return {
        isLoading: state.serviceform.isLoading,
        workplace: state.serviceform.workplace,
        stepName: state.serviceform.stepName,
        availableServices: state.serviceform.availableServices
    }
}

function mapDispatchToProps(dispatch){
    return {
        asyncSetWorkplace: (workplace)=>{
            dispatch(formAsyncSetWorkplace(workplace))
        },
        asyncSetService: (service) => {
            dispatch(formAsyncSetService(service))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFormIndex);