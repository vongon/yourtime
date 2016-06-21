import {Route, IndexRoute, IndexRedirect} from 'react-router';
import React from 'react';
import App from './container/App';
import CompanyPageIndex from './components/companypage/index';
import ProductPageIndex from './container/product/index';
import Dashboard from './container/product/dashboard';
import User from './container/product/user';
import Loading from './container/product/loading';
import Login from './container/product/login';
import ServiceFormIndex from './container/product/serviceform/index';


var requireAuth = function(nextState, replace){
    if(typeof localStorage === 'undefined'){
        console.log('redirecting to loading from requireAuth()');
        replace({
            pathname: '/app/loading',
            state: { nextPathname: nextState.location.pathname }
        })
    }
    else if(!localStorage.userToken){
        console.log('redirecting from requireAuth()');
        replace({
            pathname: '/app/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
};

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={CompanyPageIndex} />
        <Route path="index" component={CompanyPageIndex} />

        <Route path="app" component={ProductPageIndex}>
            <IndexRedirect to="loading" />
            <Route path="loading" component={Loading} />
            <Route path="login" component={Login} />
            <Route path="book" component={ServiceFormIndex} />
            <Route path="user" component={User} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
        </Route>
    </Route>
);

export default routes;
