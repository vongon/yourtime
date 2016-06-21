import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get User by JWT
router.route('/getuser').get(UserController.getUser);

export default router;