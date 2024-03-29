import 'babel-polyfill';
import React from 'react';
import getRoutes from '../shared/routes';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {configureStore} from '../shared/redux/store/configureStore';
import {syncHistoryWithStore} from 'react-router-redux';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const root = document.getElementById('root');
const routes = getRoutes(store);


render( <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>, root);
