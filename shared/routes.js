import {Route, IndexRoute, IndexRedirect} from 'react-router';
import React from 'react';
import App from './container/App';
import CompanyPageIndex from './components/companypage/index';
import ProductPageIndex from './container/product/index';
import Dashboard from './container/product/dashboard';
import User from './container/product/user';
import ProductLoading from './container/product/loading';
import ProductLogin from './container/product/login';
import ServiceFormIndex from './container/product/serviceform/index';
import AdminPageIndex from './container/admin/index';
import AdminLoading from './container/admin/loading';
import AdminLogin from './container/admin/login';
import AdminHome from './container/admin/pages/home';
import AdminEvents from './container/admin/pages/events/events';
import AdminLocations from './container/admin/pages/locations/locations';
import AdminWorkplaces from './container/admin/pages/workplaces/workplaces';
import AdminServices from './container/admin/pages/services/services';


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

var requireAdminAuth = function(nextState, replace){
    if(typeof localStorage === 'undefined'){
        console.log('redirecting to loading from requireAuth()');
        replace({
            pathname: '/admin/loading',
            state: { nextPathname: nextState.location.pathname }
        })
    }
    else if(!localStorage.userToken){
        console.log('redirecting from requireAuth()');
        replace({
            pathname: '/admin/login',
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
            <Route path="loading" component={ProductLoading} />
            <Route path="login" component={ProductLogin} />
            <Route path="book" component={ServiceFormIndex} />
            <Route path="user" component={User} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
        </Route>

        <Route path="admin" component={AdminPageIndex}>
            <IndexRedirect to="loading" />
            <Route path="loading" component={AdminLoading} />
            <Route path="login" component={AdminLogin} />
            <Route path="home" component={AdminHome} onEnter={requireAdminAuth}/>
            <Route path="events" component={AdminEvents} onEnter={requireAdminAuth}/>
            <Route path="locations" component={AdminLocations} onEnter={requireAdminAuth}/>
            <Route path="workplaces" component={AdminWorkplaces} onEnter={requireAdminAuth}/>
            <Route path="services" component={AdminServices} onEnter={requireAdminAuth}/>
        </Route>
    </Route>
);

export default routes;
