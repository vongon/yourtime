import { Router } from 'express';
import * as EventController from '../controllers/workplaces.controller';
import { requireAdmin } from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/workplaces')
    .get(EventController.getWorkplaces)
    .post(jwtCheck, requireAdmin, EventController.postWorkplaces);

router.route('/workplaces/:id')
    .get(EventController.getWorkplaceById)
    .put(jwtCheck, requireAdmin, EventController.putWorkplaceById)
    .delete(jwtCheck, requireAdmin, EventController.deleteWorkplaceById);

export default router;