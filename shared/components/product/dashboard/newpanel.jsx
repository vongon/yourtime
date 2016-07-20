import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AddCircle from 'material-ui/svg-icons/content/add-circle';


const styles = {
    button: {
        marginBottom: 20,
    },
    icon: {
        marginRight: 15
    }
};

var NewPanel = React.createClass({
    getInitialState: function(){
        return {
            hover: false
        }
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <Link to="/app/book">
                        <RaisedButton
                            style={styles.button}
                            primary={true}
                            label={'Add New Event'}
                            icon={<AddCircle/>}
                        />
                    </Link>
                </div>
            </div>
        );
    }
});

export default NewPanel;