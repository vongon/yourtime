import {Vehicle} from '../models/vehicle.model';
var isValid = require('mongoose').Types.ObjectId.isValid;


/*
 Get all vehicles owned by user_id
 */
export function getVehicles(req, res) {
    var user_id = req.user.sub;
    Vehicle.find({user_id: user_id}, function (err, vehicles) {
        if (err) return res.status(500).send({err: 'could not query database'});
        res.send(vehicles);
    });
}

/*
 Create a new vehicle under a specific user_id
 @body.user_id: (required) Auth0 user_id that owns the vehicle
 @body.edmunds_id: (required) Edmunds id for this vehicle
 */
export function postVehicles(req, res) {
    var user_id = req.user.sub;
    if (!req.body.edmunds_id) return res.status(400).send({err: 'requires a edmunds_id attribute in body to create workplace'});

    /*todo: confirm edmunds_id returns a vehicle*/

    var vehicle = new Vehicle;
    vehicle.user_id = user_id;
    vehicle.edmunds_id = req.body.edmunds_id;
    if (req.body.name) vehicle.name = req.body.name;
    vehicle.save(function (err, vehicle) {
        if (err) return res.status(500).send({err: 'could not save location object to database'});
        res.send(vehicle);
    });
}

/*
 Get vehicle by id
 */
export function getVehicleById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Vehicle.findById(id, function (err, vehicle) {
        if (err) return res.status(500).send({err: 'could not query vehicle by id'});
        if (!vehicle) return res.status(404).send({err: 'no vehicle found for id:' + id});
        res.send(vehicle);
    });
}

/*
 Edit vehicle by id
 user_id must match requesting user, user must own resource to edit
 @body.edmunds_id - new vehicle
 */
export function putVehicleById(req, res) {
    var id = req.params.id;
    var user_id = req.user.sub;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});

    Vehicle.findById(id, function (err, vehicle) {
        if (err) return res.status(500).send({err: 'could not query vehicle by id'});
        if (!vehicle) return res.status(404).send({err: 'no vehicle found for id:' + id});
        if (vehicle.user_id !== user_id) return res.status(404).send({err: 'user must own this vehicle to edit'});

        if (req.body.edmunds_id) vehicle.edmunds_id = req.body.edmunds_id;
        if (req.body.name) vehicle.name = req.body.name;
        
        vehicle.save(function (err, vehicle) {
            if (err) return res.status(500).send({err: 'could not save day object to database'});
            res.send(vehicle);
        });
    });
}


/*
 Delete vehicle by id
 user_id must match requesting user, user must own resource to edit
 @body.edmunds_id - new vehicle
 */
export function deleteVehicleById(req, res) {
    var id = req.params.id;
    var user_id = req.user.sub;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});

    Vehicle.findById(id, function (err, vehicle) {
        if (err) return res.status(500).send({err: 'could not query vehicle by id'});
        if (!vehicle) return res.status(404).send({err: 'no vehicle found for id:' + id});
        if (vehicle.user_id !== user_id) return res.status(400).send({err: 'user must own this vehicle to delete'});

        vehicle.remove(function (err, vehicle) {
            if (err) return res.status(500).send({err: 'could not save day object to database'});
            res.send(vehicle);
        });
    });
}