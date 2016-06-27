import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';

const styles = {
    paper: {
        marginBottom: 20,
    },
    icon: {
        marginRight: 15
    }
};

var LoadPanel = React.createClass({
    getInitialState: function(){
        return {
            hover: false
        }
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <a href="#">
                        <Paper
                            style={styles.paper}
                            zDepth={this.state.hover ? 3 : 1}
                            onMouseEnter={()=>{this.setState({hover: true})}}
                            onMouseLeave={()=>{this.setState({hover: false})}}>
                            <div className="container-fluid">
                                <h4 style={{}}>
                                    Load Previous Services
                                </h4>
                            </div>
                        </Paper>
                    </a>
                </div>
            </div>
        );
    }
});

export default LoadPanel;