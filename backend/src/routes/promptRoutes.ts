import { Router } from 'express';
import { PromptController } from '../controllers/promptController';

const router = Router();
const promptController = new PromptController();

router.post('/', promptController.createPrompt);
router.get('/user/:userId', promptController.getPromptsByUserId);
router.get('/', promptController.getAllPrompts);

export default router;