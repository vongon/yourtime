import _ from 'lodash';
import {Service} from '../models/service.model';
import {Workplace} from '../models/workplace.model';
import mongoose from 'mongoose';

/*
 Query all services
 */
export function getService(req, res) {
    Service.find({}, function(err, services){
        if (err) {
            return console.error(err);
            res.status(500).send({err: 'could not query database'});
        }
        res.send(services);
    });
}

/*
 Create new Service
 @body.workplace_id: id of workplace that service is for
 @body.name: name of the new service
 @body.description: description of the new service
 @body.price: price of the new service
 */
export function postService(req, res){
    if(!req.body.workplace_id) return res.status(400).send({err: 'requires a workplace_id'});
    if(!req.body.name) return res.status(400).send({err: 'requires a name'});
    if(!req.body.description) return res.status(400).send({err: 'requires a description'});
    if(!req.body.price) return res.status(400).send({err: 'requires a price'});

    Workplace.findById(req.body.workplace_id, function(err, workplace){
        if (err) {
            res.status(500).send({err: 'could not query that workplace_id'});
            return console.error(err);
        }

        var service = new Service;
        service.name = req.body.name;
        service.workplace_id = workplace._id;
        service.workplace_name = workplace.name;
        service.description = req.body.description;
        service.price = +req.body.price;

        service.save(function(err, service){
            if (err) {
                res.status(500).send({err: 'could not save new service'});
                return console.error(err);
            }
            res.send(service);
        });
    });
}