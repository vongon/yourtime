import { Router } from 'express';
import * as EventController from '../controllers/locations.controller';
import { requireAdmin } from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/locations')
    .get(EventController.getLocations)
    .post(jwtCheck, requireAdmin, EventController.postLocations);

router.route('/locations/:id')
    .get(EventController.getLocationById)
    .put(jwtCheck, requireAdmin, EventController.putLocationById)
    .delete(jwtCheck, requireAdmin, EventController.deleteLocationById);


export default router;