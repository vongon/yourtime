import {Route, IndexRoute} from 'react-router';
import React from 'react';
import App from './container/App';
import CompanyPageIndex from './components/companypage/index';

const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={CompanyPageIndex} />
        <Route path="/home" component={CompanyPageIndex} />
    </Route>
);

export default routes;
