import { Router } from 'express';
import * as EventController from '../controllers/customers.controller';
import { requireAdmin } from '../util/requireAdmin';
import jwtCheck from '../util/jwtCheck';

const router = new Router();

router.route('/customers')
    //.get(jwtCheck, requireAdmin, EventController.getCustomers)
    .post(jwtCheck, EventController.postCustomers);

//router.route('/customers/:id')
    //.get(jwtCheck, EventController.getCustomerById)
    //.put(jwtCheck, requireAdmin, EventController.putCustomerById)
    //.delete(jwtCheck, requireAdmin, EventController.deleteCustomerById);

export default router;