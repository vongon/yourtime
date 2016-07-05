import { Router } from 'express';
import * as EventController from '../controllers/vehicles.controller';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/vehicles')
    .get(jwtCheck, EventController.getVehicles)
    .post(jwtCheck, EventController.postVehicles);

router.route('/vehicles/:id')
    .get(EventController.getVehicleById)
    .put(jwtCheck, EventController.putVehicleById)
    .delete(jwtCheck, EventController.deleteVehicleById);

export default router;