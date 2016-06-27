import { Router } from 'express';
import * as EventController from '../controllers/workplace.controller';
const router = new Router();
import {requireAdmin} from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';

router.route('/workplace')
    .get(EventController.getWorkplace)
    .post(jwtCheck, requireAdmin, EventController.postWorkplace);


export default router;