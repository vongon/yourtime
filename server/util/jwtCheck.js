import jwt from 'express-jwt';

export default jwt({
    secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
    audience: process.env.AUTH0_CLIENT
});