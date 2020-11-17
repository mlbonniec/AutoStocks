import { Router, Request, Response } from 'express';
import sku from './sku';

const router = Router();

// router.get('/', (_req: Request, res: Response): any => res.json({message: "Welcome to the SKU API! There's nothing here..."}));
router.get('/', (_req: Request, res: Response): any => {
  res.render('index', { user: { name: 'World' } });
});
router.use('/sku', sku);

export default router;
