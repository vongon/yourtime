import _ from 'lodash';

export function requireAdmin(req, res, next){
    var admin = _.get(req, 'user.app_metadata.admin', false);
    if(admin){
        return next();
    }
    res.status(401).send({err: 'admin required for this action'});
    next('invalid admin request');
}