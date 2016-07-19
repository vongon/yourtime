import { Router } from 'express';
import * as EventController from '../controllers/edmunds.controller';


const router = new Router();

router.route('/edmunds/makes')
    .get(EventController.getMakes);

router.route('/edmunds/styles')
    .get(EventController.getStyles);

export default router;