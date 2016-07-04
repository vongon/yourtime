import { Location } from '../models/location.model';
var isValid = require('mongoose').Types.ObjectId.isValid;

/*
 Get all locations
 */
export function getLocations(req, res) {
    Location.find({}, function(err, locations){
        if (err) {
            res.status(500).send({err: 'could not query database'});
            return console.error(err);
        }
        res.send(locations);
    });
}


/*
 Create new location
 @body.location: location object to create
 */
export function postLocations(req, res){
    if(!req.body.name) return res.status(400).send({err: 'requires a name attribute in body to create location'});
    var location = new Location;
    location.name = req.body.name;
    location.save(function(err, location){
        if (err) {
            res.status(500).send({err: 'could not save location object to database'});
            return console.error(err);
        }
        res.send(location);
    });
}


/*
 Get location by id
 */
export function getLocationsId(req, res){
    var id = req.params.id;
    if(!isValid(id)) {
        res.status(400).send({err: 'invalid id'});
        return;
    }
    Location.findById(id, function(err,location){
        if (err) {
            res.status(500).send({err: 'could not save location object to database'});
            return console.error(err);
        }
        if(!location){
            res.status(404).send({err: 'no location found for id:'+id});
            return;
        }
        res.send(location);
    });

}


/*
Post location by id
Update a location
@req.body.name - new name for location
@req.body.newDayId - id of new day object to add
*/
export function postLocationsId(req, res){
    var id = req.params.id;
    if(!isValid(id)) {
        res.status(400).send({err: 'invalid id'});
        return;
    }
    Location.findById(id, function(err,location){
        if (err) {
            res.status(500).send({err: 'could not query location by id'});
            return console.error(err);
        }
        if(!location){
            res.status(404).send({err: 'no location found for id:'+id});
            return;
        }


        if(req.body.name) location.name = req.body.name;
        if(req.body.newDayId && isValid(req.body.newDayId)){
            location.days.push(req.body.newDayId);
        } else {
            res.status(400).send({err: 'invalid newDayId'});
            return;
        }

        location.save(function(err, location){
            if (err) {
                res.status(500).send({err: 'could not save location object to database'});
                return console.error(err);
            }
            res.send(location);
        });
    });

}