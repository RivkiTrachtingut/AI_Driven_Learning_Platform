import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.post('/login', userController.loginOrRegister);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);

export default router;