import { Day } from '../models/day.model';
import moment from 'moment';
var isValid = require('mongoose').Types.ObjectId.isValid;

/*
 Create new day
 @body.day: required, day object to create
 @body.capacity: optional, defaults to 8
 */
export function postDay(req, res){
    if(!req.body.date) return res.status(400).send({err: 'requires a date attribute in body to create location'});
    if(!moment(req.body.date).isValid())return res.status(400).send({err: 'invalid date'});
    var day = new Day;
    day.date = req.body.date;
    day.capacity = req.body.capacity || 8;
    day.save(function(err, day){
        if (err) return res.status(500).send({err: 'could not save day object to database, did you send a valid date?'});
        res.send(day);
    });
}

/*
 Get day by id
 */
export function getDayById(req, res) {
    var id = req.params.id;
    if (!isValid(id)) return res.status(400).send({err: 'invalid id'});
    Day.findById(id, function(err,day){
        if (err) return res.status(500).send({err: 'could not query database'});
        if(!day) return res.status(404).send({err: 'no day found for id:'+id});
        res.send(day);
    });

}

/*
 Edit day by id
 @body.date - new date to assign to day
 @body.capacity - new capacity
 */
export function putDayById(req, res){
    var id = req.params.id;
    if(!isValid(id)) {
        res.status(400).send({err: 'invalid id'});
        return;
    }
    Day.findById(id, function(err,day){
        if (err) return res.status(500).send({err: 'could not query day by id'});
        if(!day) return res.status(404).send({err: 'no day found for id:'+id});

        if(req.body.date) day.date = req.body.date;
        if(req.body.capacity) day.capacity = req.body.capacity;

        day.save(function(err, day){
            if (err) return res.status(500).send({err: 'could not save day object to database, did you send an invalid date?'});
            res.send(day);
        });
    });
}


/*
 delete day by id
 */
export function deleteDayById(req, res){
    var id = req.params.id;
    if(!isValid(id)) {
        res.status(400).send({err: 'invalid id'});
        return;
    }
    Day.findById(id, function(err,day){
        if (err) return res.status(500).send({err: 'could not query day by id'});
        if(!day) return res.status(404).send({err: 'no day found for id:'+id});

        if(req.body.date) day.date = req.body.date;
        if(req.body.capacity) day.capacity = req.body.capacity;

        day.remove(function(err, day){
            if (err) return res.status(500).send({err: 'could not delete day from database'});
            res.send(day);
        });
    });
}