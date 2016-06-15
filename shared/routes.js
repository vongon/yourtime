import {Route, IndexRoute, IndexRedirect} from 'react-router';
import React from 'react';
import App from './container/App';
import CompanyPageIndex from './components/companypage/index';
import ProductPageIndex from './container/product/index';
import Dashboard from './container/product/dashboard';
import User from './container/product/user';
import ScheduledServices from './components/product/dashboard/scheduledservices';
import CompletedServices from './components/product/dashboard/completedservices';
import Recommendations from './components/product/dashboard/reccomendations';
import NewService from './container/product/newservice';



const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={CompanyPageIndex} />
        <Route path="index" component={CompanyPageIndex} />
        
        <Route path="app" component={ProductPageIndex}>
            <IndexRedirect to="book" />
            <Route path="book" component={NewService} />
            <Route path="user" component={User} />
            <Route path="dashboard" component={Dashboard}>
                <IndexRoute component={ScheduledServices} />
                <Route path="scheduled" component={ScheduledServices}/>
                <Route path="completed" component={CompletedServices}/>
                <Route path="recommendations" component={Recommendations}/>
            </Route>
        </Route>
    </Route>
);

export default routes;
