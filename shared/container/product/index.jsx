import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import NavBar from './navbar';
import Snackbar from 'material-ui/Snackbar';
import {setSnackbarMessage} from '../../redux/actions/product/global.actions';
 

var Index = React.createClass({
    render: function(){
        return (
            <div id="product-app" className="container">
                <Helmet
                    title="YourTime App"
                    meta={[
                    { charset: 'utf-8' },
                    {
                      'http-equiv': 'X-UA-Compatible',
                      content: 'IE=edge',
                    },
                    {
                      name: 'viewport',
                      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
                    },
                  ]}
                link={[
                    {"href":"https://fonts.googleapis.com/css?family=Roboto:400,300,500","rel":"stylesheet", "type":"text/css"},
                    {"href":"/css/bootstrap.min.css","rel":"stylesheet"},
                    {"href":"/css/product.css","rel":"stylesheet"},
                    {"href":"/font-awesome/css/font-awesome.min.css","rel":"stylesheet","type":"text/css"},
                    {"href":"https://fonts.googleapis.com/css?family=Montserrat:400,700","rel":"stylesheet","type":"text/css"},
                    {"href":"https://fonts.googleapis.com/css?family=Kaushan+Script","rel":"stylesheet","type":"text/css"},
                    {"href":"https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic","rel":"stylesheet","type":"text/css"},
                    {"href":"https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700","rel":"stylesheet","type":"text/css"},
                    {"href":"https://unpkg.com/react-select/dist/react-select.css","rel":"stylesheet"}
                ]}
                />
                <NavBar/>
                {this.props.children}
                <Snackbar
                    open={this.props.message !== ''}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.props.clearMessage}
                />
            </div>
        );
    }
});

function mapStateToProps(state, ownProps){
    return {
        message: state.product.global.message || ''
    };
}

function mapDispatchToProps(dispatch){
    return {
        clearMessage: () => {
            dispatch(setSnackbarMessage(''));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

