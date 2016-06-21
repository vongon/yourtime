import React from 'react';
import DatePicker from 'material-ui/DatePicker';

function disableWeekends(date) {
    return date.getDay() === 0 ||
        date.getDay() === 1 ||
        date.getDay() === 2 ||
        //date.getDay() === 3 ||
        date.getDay() === 4 ||
        date.getDay() === 5 ||
        date.getDay() === 6;
}

var Workplace = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div style={{display:'inline-block',margin:'auto'}}>
                            <DatePicker hintText="Choose a service date" container="inline" shouldDisableDate={disableWeekends}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Workplace;