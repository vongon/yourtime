import _ from 'lodash';
import {Service} from '../models/service.model';
import {Workplace} from '../models/workplace.model';
import {Event} from '../models/event.model';

/*
Get event by event_id
@query.event_id = id of event
 */
export function getEvent(req, res) {
    if (!req.query.event_id) return res.status(400).send({err: 'requires a event_id'});

    Event.findById(req.query.event_id, function(err, event){
        if (err) {
            res.status(500).send({err: 'could not query that event_id'});
            return console.error(err);
        }
        res.send(event);
    });
}

/*
Create a new event document
 */
export function postEvent(req, res) {
    var user_id = req.user.sub;
    if (!req.body.workplace_id) return res.status(400).send({err: 'requires a workplace_id'});
    if (!req.body.service_id) return res.status(400).send({err: 'requires a service_id'});
    if (!req.body.date && new Date(req.body.date)) return res.status(400).send({err: 'requires a valid date'});
    if (!req.body.vehicle_make) return res.status(400).send({err: 'requires a vehicle make'});
    if (!req.body.vehicle_model) return res.status(400).send({err: 'requires a vehicle model'});
    if (!req.body.vehicle_year) return res.status(400).send({err: 'requires a vehicle year'});

    Workplace.findById(req.body.workplace_id, function (err, workplace) {
        if (err) {
            res.status(500).send({err: 'could not query that workplace_id'});
            return console.error(err);
        }
        Service.findById(req.body.service_id, function (err, service) {
            if (err) {
                res.status(500).send({err: 'could not query that service_id'});
                return console.error(err);
            }
            var event = new Event;
            event.user_id = user_id;
            event.user = req.user;
            event.service = service;
            event.workplace = workplace;
            event.date = new Date(req.body.date);
            event.vehicle = {
                make: req.body.vehicle_make,
                model: req.body.vehicle_model,
                year: req.body.vehicle_year
            };
            event.save(function (err, event) {
                if (err) {
                    res.status(500).send({err: 'could not save new event'});
                    return console.error(err);
                }
                res.send(event);
            });
        });
    });
}

/*
Delete an event by event_id
@body.event_id = id of event
@req.user.sub = must match user_id of event
 */
export function deleteEvent(req, res) {
    if (!req.body.event_id) return res.status(400).send({err: 'requires a event_id'});
    Event.findById(req.body.event_id, function(err, event){
        if (err) {
            res.status(500).send({err: 'could not query that event_id'});
            return console.error(err);
        }
        if(event.user_id !== req.user.sub) return res.status(400).send({err: 'you must be logged in as the event owner to delete'});
        event.remove(function(err, event){
            if (err) {
                res.status(500).send({err: 'failed to delete event'});
                return console.error(err);
            }
            res.send(event);
        });
    });
}

/*
Get all events owned by a user
@req.user.sub = user's id
 */
export function getEvents(req, res){
    Event.find({user_id: req.user.sub}, function(err, events){
        if (err) {
            res.status(500).send({err: 'error when querying database'});
            return console.error(err);
        }
        res.send(events);
    });
}