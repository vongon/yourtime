import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

var App = React.createClass({
    render: function () {
        console.log('render App');
        return (
        <div id="page-top" className="index">
            <Helmet
                title="YourTime"
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
                {"href":"/css/agency.css","rel":"stylesheet"},
                {"href":"/font-awesome/css/font-awesome.min.css","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Montserrat:400,700","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Kaushan+Script","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic","rel":"stylesheet","type":"text/css"},
                {"href":"https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700","rel":"stylesheet","type":"text/css"}
                ]}
            />
            { this.props.children }
        </div>
        );

    }
});

export default connect()(App);
