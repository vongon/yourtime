import _ from 'lodash';
import {Workplace} from '../models/workplace.model';

/*
Query all workplaces
 */
export function getWorkplace(req, res) {
    Workplace.find({}, function(err, workplaces){
        if (err) {
            return console.error(err);
            res.status(500).send({err: 'could not query database'});
        }
        res.send(workplaces);
    });
}

/*
Create new workplace
@body.name: name of new workplace
@body.day_of_week: number of the day of the week that we service this workplace
 */
export function postWorkplace(req, res){
    if(!req.body.name) return res.status(400).send({err: 'requires a name attribute in body to create workplace'});
    if(!req.body.day_of_week) return res.status(400).send({err: 'required a day_of_week attribute'});
    var workplace = new Workplace;
    workplace.name = req.body.name;
    workplace.save(function(err, workplace){
        if (err) {
            return console.error(err);
            res.status(500).send({err: 'could not save worplace object to datebase'});
        }
        res.send(workplace);
    });
}