import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import appNavBar from '../../components/product/navbar';
import formNavBar from '../../components/product/serviceform/navbar';
import { authLogOut } from '../../redux/actions/auth.actions';
import { browserHistory } from 'react-router';


var Index = React.createClass({
    showLogin: function(){
        this.props.lock.show({
            responseType: 'token',
            authParams: {
                scope: 'openid nickname email'
            }
        });
    },
    render: function(){
        var NavBar;
        switch(this.props.nextRoute){
            case "book":
            case "loading":
            case "login":
                NavBar = formNavBar;
                break;
            default:
                NavBar = appNavBar;
        }


        return (
            <div className="container">
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
                {"href":"/css/bootstrap.min.css","rel":"stylesheet"},
                {"href":"/css/product.css","rel":"stylesheet"},
                {"href":"/font-awesome/css/font-awesome.min.css","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Montserrat:400,700","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Kaushan+Script","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700","rel":"stylesheet","type":"text/css"}
                ]}
                />
                <NavBar logOut={this.props.logOut}/>
                {this.props.children}
            </div>
        );
    }
});

function mapStateToProps(state, ownProps){
    return {
        lock: state.auth.lock,
        isLoading: state.auth.isLoading,
        nextRoute: ownProps.routes[2].path,
        user: state.auth.user,
        tokenId: state.auth.tokenId
    };
}

function mapDispatchToProps(dispatch){
    return {
        logOut: ()=>{
            dispatch(authLogOut());
            browserHistory.push('/app/login');
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

