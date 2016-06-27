import { Router } from 'express';
import * as EventController from '../controllers/event.controller';
const router = new Router();
import jwtCheck from '../util/jwtCheck';


router.route('/event')
    .get(jwtCheck, EventController.getEvent)
    .post(jwtCheck, EventController.postEvent)
    .delete(jwtCheck, EventController.deleteEvent);

router.route('/events')
    .get(jwtCheck, EventController.getEvents);

export default router;