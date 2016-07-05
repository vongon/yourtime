import { Event } from '../models/event.model';
var isValid = require('mongoose').Types.ObjectId.isValid;

var populateEvent = function(event, req, done){
    event.user_id = req.user.sub;
    if(req.body.workplace_id) event.workplace_id = req.body.workplace_id;
    if(req.body.vehicle_id) event.vehicle_id = req.body.vehicle_id;
    if(req.body.date) event.date = req.body.date;
    if(req.body.services) {
        var count = 0;
        var errorDetected = false;
        req.body.services.map(function (service_id) {
            if(!isValid(service_id)){
                if(!errorDetected) done('invalid service_id');
                errorDetected = true;
            } else {
                event.services.push(service_id);
                count++;
                if (count === req.body.services.length) done(null, event);
            }
        });
    } else {
        done(null, event);
    }
};


/*
 Get all events owned by a user
 */
export function getEvents(req, res) {
    var user_id = req.user.sub;
    Event.find({user_id: user_id}, function (err, events) {
        if (err) return res.status(500).send({err: 'could not query database'});
        res.send(events);
    });
}


/*
 Create a new event under a specific user_id
 workplace_id: (required) Schema.Types.ObjectId,
 vehicle_id: (required) Schema.Types.ObjectId,
 services: (required) [ Schema.Types.ObjectId ],
 date: Date

 */
export function postEvents(req, res) {
    if (!req.body.workplace_id) return res.status(400).send({err: 'requires a workplace_id attribute in body to create event'});
    if (!isValid(req.body.workplace_id)) return res.status(400).send({err: 'invalid workplace_id'});

    if (!req.body.vehicle_id) return res.status(400).send({err: 'requires a vehicle_id attribute in body to create event'});
    if (!isValid(req.body.vehicle_id)) return res.status(400).send({err: 'invalid vehicle_id'});

    if (!req.body.services) return res.status(400).send({err: 'requires a services array attribute in body to create event'});
    if (!Array.isArray(req.body.services)) return res.status(400).send({err: 'requires a services to be an array'});

    if (!req.body.date) return res.status(400).send({err: 'requires a date attribute in body to create event'});

    var event = new Event;
    populateEvent(event, req, function(err, event){
        if(err) return res.status(400).send({err: err});
        event.save(function (err, event) {
            if (err) return res.status(500).send({err: 'could not save event object to database'});
            res.send(event);
        });
    });
}


/*
 Get an event by id
 */
export function getEventById(req, res){
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Event.findById(id, function (err, event) {
        if (err) return res.status(500).send({err: 'could not save event object to database'});
        if (!event) return res.status(404).send({err: 'no event found for id:' + id});
        res.send(event);
    });
}

/*
 put event by id
 */
export function putEventById(req, res) {
    var id = req.params.id;
    var user_id = req.user.sub;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});

    Event.findById(id, function (err, event) {
        if (err) return res.status(500).send({err: 'could not query event by id'});
        if (!event) return res.status(404).send({err: 'no event found for id:' + id});
        if (event.user_id !== user_id) return res.status(404).send({err: 'user must own this event to edit'});

        populateEvent(event, req, function(err, event){
            if(err) return res.status(400).send({err: err});
            event.save(function (err, event) {
                if (err) return res.status(500).send({err: 'could not save event object to database'});
                res.send(event);
            });
        });
    });
}

/*
 delete event by id
 */
export function deleteEventById(req, res){
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Event.findById(id, function (err, event) {
        if (err) return res.status(500).send({err: 'could not save event object to database'});
        if (!event) return res.status(404).send({err: 'no event found for id:' + id});
        if (event.user_id !== req.user.sub) return res.status(400).send({err: 'user must own this event to delete'});
        event.remove(function(err, event){
            if (err) return res.status(500).send({err: 'could not delete event from database'});
            res.send(event);
        });
    });
}