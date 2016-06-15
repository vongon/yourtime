import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import appNavBar from '../../components/product/navbar';
import formNavBar from '../../components/product/serviceform/navbar';

var Index = React.createClass({
    render: function(){
        var NavBar;
        if(this.props.nextRoute === "book"){
            NavBar = formNavBar;
        } else {
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
                      content: 'width=device-width, initial-scale=1',
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
                <NavBar />
                {this.props.children}
            </div>
        );
    }
});

function mapStateToProps(state, ownProps){
    return {nextRoute: ownProps.routes[2].path};
}

export default connect(mapStateToProps)(Index);

