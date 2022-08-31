import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';
const router = Router();
router.get('/test', TransactionController.test);
router.post('/fund', TransactionController.fund);
router.post('/transfer', TransactionController.transfer);

export default router;