import {Service} from '../models/service.model';
var isValid = require('mongoose').Types.ObjectId.isValid;
var ObjectId = require('mongoose').Types.ObjectId;

/*
 get all services
 */
export function getServices(req, res) {
    Service.find({}, function (err, services) {
        if (err) {
            res.status(500).send({err: 'could not query database'});
            return console.error(err);
        }
        res.send(services);
    });
}


/*
 Create a service
 @body.type: (required) {type: String, enum: ['auto']}, //we will add more service types in the future
 @body.category: (required) {type: String, enum: ['oil change','tire rotation', 'inspection']},
 @body.name: (required) String,
 @body.description: (required) String,
 @body.price: (required) Number, USD
 @body.workplace_id: (required) Schema.Types.ObjectId
 */
export function postServices(req, res) {
    if (!req.body.type) return res.status(400).send({err: 'requires a type attribute in body to create location'});
    if (!req.body.category) return res.status(400).send({err: 'requires a category attribute in body to create location'});
    if (!req.body.name) return res.status(400).send({err: 'requires a name attribute in body to create location'});
    if (!req.body.description) return res.status(400).send({err: 'requires a description attribute in body to create location'});
    if (!req.body.price) return res.status(400).send({err: 'requires a price attribute in body to create location'});
    if (!req.body.workplace_id) return res.status(400).send({err: 'requires a workplace_id attribute in body to create location'});
    if (!isValid(req.body.workplace_id)) return res.status(400).send({err: 'invalid workplace_id'});

    var service = new Service;
    service.type = req.body.type;
    service.category = req.body.category;
    service.name = req.body.name;
    service.description = req.body.description;
    service.price = req.body.price;
    service.workplace_id = ObjectId(req.body.workplace_id);

    service.save(function (err, service) {
        if (err) return res.status(500).send({err: 'could not save service object to database, confirm values of type and category because they are enums'});
        res.send(service);
    });
}


/*
 Edit a service by id
 @body.type: {type: String, enum: ['auto']}, //we will add more service types in the future
 @body.category: {type: String, enum: ['oil change','tire rotation', 'inspection']},
 @body.name: String,
 @body.description: String,
 @body.price: Number, USD
 @body.workplace_id: Schema.Types.ObjectId
 */
export function putServiceById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Service.findById(id, function (err, service) {
        if (err) return res.status(500).send({err: 'could not query service by id'});
        if (!service) return res.status(404).send({err: 'no service found for id:' + id});

        if (req.body.type) service.type = req.body.type;
        if (req.body.category) service.category = req.body.category;
        if (req.body.name) service.name = req.body.name;
        if (req.body.description) service.description = req.body.description;
        if (req.body.price) service.price = req.body.price;
        if (req.body.workplace_id) service.workplace_id = req.body.workplace_id;

        service.save(function (err, service) {
            if (err) return res.status(500).send({err: 'could not save service object to database'});
            res.send(service);
        });
    });
}