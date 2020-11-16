import { Router, Request, Response } from 'express';
import sku from './sku';

const router = Router();

router.get('/', (_req: Request, res: Response): any => res.json({message: "Welcome to my API! There's nothing here..."}));
router.get('/sku', sku);

export default router;
