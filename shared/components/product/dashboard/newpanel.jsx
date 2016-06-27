import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


const styles = {
    paper: {
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
                        <Paper
                            style={styles.paper}
                            zDepth={this.state.hover ? 3 : 1}
                            onMouseEnter={()=>{this.setState({hover: true})}}
                            onMouseLeave={()=>{this.setState({hover: false})}}>
                            <div className="container-fluid">
                                <h4 style={{}}>
                                    <i className="fa fa-plus-circle"
                                       aria-hidden="true"
                                       style={styles.icon}/>
                                    Add New Service
                                </h4>
                            </div>
                        </Paper>
                    </Link>
                </div>
            </div>
        );
    }
});

export default NewPanel;