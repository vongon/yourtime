import { Router } from 'express';
import * as EventController from '../controllers/events.controller';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/events')
    .get(jwtCheck, EventController.getEvents)
    .post(jwtCheck, EventController.postEvents);

router.route('/events/:id')
    .get(EventController.getEventById)
    .put(jwtCheck, EventController.putEventById)
    .delete(jwtCheck, EventController.deleteEventById);

export default router;