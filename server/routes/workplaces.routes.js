import { Router } from 'express';
import * as EventController from '../controllers/workplaces.controller';
import { requireAdmin } from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/workplaces')
    .get(EventController.getWorkplaces)
    .post(jwtCheck, requireAdmin, EventController.postWorkplaces);

export default router;