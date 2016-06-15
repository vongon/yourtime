import React from 'react';
import { Link } from 'react-router';

var Tabs = React.createClass({
    propTypes: {
          activeTab: React.PropTypes.oneOf(['scheduled','completed','recommendations']).isRequired
    },
    render: function () {
        var scheduledClasses = "";
        var completedClasses = "";
        var recommendationsClasses = "";
        switch(this.props.activeTab){
            case 'scheduled':
                scheduledClasses += " active";
                break;
            case 'completed':
                completedClasses += " active";
                break;
            case 'recommendations':
                recommendationsClasses += " active";
                break;
            default:
                console.warn('did not detect route in dashboard');
            //do nothing
        }
        return (
            <ul className="nav nav-tabs">
                <li role="presentation" className={scheduledClasses}>
                    <Link to="/app/dashboard/scheduled">Scheduled Services</Link>
                </li>
                <li role="presentation" className={completedClasses}>
                    <Link to="/app/dashboard/completed">Completed Services</Link>
                </li>
                <li role="presentation" className={recommendationsClasses}>
                    <Link to="/app/dashboard/recommendations">Recommendations</Link>
                </li>
            </ul>
        );
    }
});

export default Tabs;