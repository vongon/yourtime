if(!process.env.ON_HEROKU) require('dotenv').config();
require('babel-register');
require('babel-polyfill');
require('css-modules-require-hook');
require('./server/server');
