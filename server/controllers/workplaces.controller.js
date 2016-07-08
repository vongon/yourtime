import { Workplace } from '../models/workplace.model';
import { Location } from '../models/location.model';
var isValid = require('mongoose').Types.ObjectId.isValid;

/*
 Get all workplaces
 */
export function getWorkplaces(req, res) {
    Workplace.find({}, function(err, workplaces){
        if (err) {
            res.status(500).send({err: 'could not query database'});
            return console.error(err);
        }
        res.send(workplaces);
    });
}


/*
 Create new workplace
 @body.workplace: workplace object to create
 @workplace.name: required, name of workplace
 @workplace.location_id: required, id of location for workplace
 */
export function postWorkplaces(req, res){
    if(!req.body.location_id) return res.status(400).send({err: 'requires a location_id attribute in body to create workplace'});
    if(!isValid(req.body.location_id)) return res.status(400).send({err: 'invalid location_id'});
    if(!req.body.name) return res.status(400).send({err: 'requires a name attribute in body to create workplace'});
    
    var workplace = new Workplace;
    workplace.name = req.body.name;

    Location.findById(req.body.location_id, function(err, location){
        if (err) {
            res.status(500).send({err: 'could not query location by id'});
            return console.error(err);
        }
        if(!location){
            res.status(404).send({err: 'no location found for id'});
            return;
        }
        workplace.location_id = req.body.location_id;
        workplace.save(function(err, workplace){
            if (err) return res.status(500).send({err: 'could not save location object to database'});
            res.send(workplace);
        });
    });
}



/*
 Edit a workplace by id
 @workplace.name: optional, name of workplace
 @workplace.location_id: optional, id of location for workplace
 */
export function putWorkplaceById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Workplace.findById(id, function (err, workplace) {
        if (err) return res.status(500).send({err: 'could not query workplace by id'});
        if (!workplace) return res.status(404).send({err: 'no workplace found for id:' + id});

        if (req.body.name) workplace.name = req.body.name;
        if (req.body.location_id) workplace.location_id = req.body.location_id;

        workplace.save(function (err, workplace) {
            if (err) return res.status(500).send({err: 'could not save workplace object to database'});
            res.send(workplace);
        });
    });
}


/*
 delete a workplace by id
 @workplace.name: optional, name of workplace
 @workplace.location_id: optional, id of location for workplace
 */
export function deleteWorkplaceById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Workplace.findById(id, function (err, workplace) {
        if (err) return res.status(500).send({err: 'could not query workplace by id'});
        if (!workplace) return res.status(404).send({err: 'no workplace found for id:' + id});

        workplace.remove(function (err, workplace) {
            if (err) return res.status(500).send({err: 'could not save workplace object to database'});
            res.send(workplace);
        });
    });
}


/*
 get a workplace by id
 @workplace.name: optional, name of workplace
 @workplace.location_id: optional, id of location for workplace
 */
export function getWorkplaceById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Workplace.findById(id, function (err, workplace) {
        if (err) return res.status(500).send({err: 'could not query workplace by id'});
        if (!workplace) return res.status(404).send({err: 'no workplace found for id:' + id});
        res.send(workplace);
    });
}