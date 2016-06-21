import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import jwt from 'express-jwt';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();


if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import {configureStore} from '../shared/redux/store/configureStore';
import {Provider} from 'react-redux';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../shared/routes';
import user_routes from './routes/user.routes';
import {fetchComponentData} from './util/fetchData';
import serverConfig from './config';

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
    }
});

// initialize JWT authentication
var jwtCheck = jwt({
    secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT
});

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(Express.static(path.resolve(__dirname, '../static')));
app.use('/api', jwtCheck);
app.use('/api/user', user_routes);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
    const cssPath = process.env.NODE_ENV === 'production' ? '/css/app.min.css' : '/css/app.css';
    const head = Helmet.rewind();

    return `
	<!doctype html>
	<html>
	  <head>
		${head.base.toString()}
		${head.title.toString()}
		${head.meta.toString()}
		${head.link.toString()}
		${head.script.toString()}
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
		<link rel="stylesheet" href=${cssPath} />
	  </head>
	  <body>
		<div id="root">${html}</div>
		<script>
		  window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
		</script>
		<!-- jQuery -->
        <script src="/js/jquery.min.js"></script>
    
        <!-- Bootstrap Core JavaScript -->
        <script src="/js/bootstrap.min.js"></script>
    
        <!-- Plugin JavaScript -->
        <script src="/js/jquery.easing.min.js"></script>
        <script src="/js/classie.js"></script>
        
        <!-- Auth0 Lock -->
        <!--<script src="//cdn.auth0.com/js/lock-9.1.min.js"></script>-->
        
        <!-- Custom Theme JavaScript -->
		<script src="/dist/bundle.js"></script>

	  </body>
	</html>
  `;
};

const renderError = err => {
    const softTab = '&#32;&#32;&#32;&#32;';
    const errTrace = process.env.NODE_ENV !== 'production' ?
        `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
    return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
    match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end(renderError(err));
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
            return next();
        }

        const initialState = {
            auth: {
                auth0_domain: process.env.AUTH0_DOMAIN,
                auth0_client: process.env.AUTH0_CLIENT
            }
        };

        const store = configureStore(initialState);

        return fetchComponentData(store, renderProps.components, renderProps.params)
            .then(() => {
                const initialView = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                );
                const finalState = store.getState();

                res.status(200).end(renderFullPage(initialView, finalState));
            })
            .catch((err) => next(err));
    });
});

// start app
app.listen(serverConfig.port, (error) => {
    if (!error) {
        console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
    }
});

export default app;
