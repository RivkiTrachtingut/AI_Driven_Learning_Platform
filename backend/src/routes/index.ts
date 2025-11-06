import { Router } from 'express';
import userRoutes from './userRoutes';
import promptRoutes from './promptRoutes';
import categoryRoutes from './categoryRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/prompts', promptRoutes);
router.use('/categories', categoryRoutes);

export default router;