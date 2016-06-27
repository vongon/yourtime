import { Router } from 'express';
import * as EventController from '../controllers/service.controller';
const router = new Router();
import {requireAdmin} from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';


router.route('/service')
    .get(EventController.getService)
    .post(jwtCheck, requireAdmin, EventController.postService);


export default router;