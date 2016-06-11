import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { incrementCounter } from '../redux/actions/actions';


var App = React.createClass({
  render: function(){
    console.log('render App');
    return (<div>
              <Helmet
                title="MERN Starter - Blog App"
                titleTemplate="%s - Blog App"
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
              />

              <h1>hello world from app!</h1>
              <button id={0} onClick={this.props.clicked}>increment counter 0</button>
              <button id={1} onClick={this.props.clicked}>increment counter 1</button>
              {this.props.counters.map(
                function(counter){
                  return <p key={counter.id}>{JSON.stringify(counter)}</p>
                })}
            </div>);
  }
});

function mapStateToProps(store) {
  return {
    counters: store.counters,
  };
}

function mapDispatchToProps(dispatch){
  return {
    clicked:(e) => { dispatch(incrementCounter(Number(e.target.id))) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
