import { getBarcodes, getSkus, IBarcodes, ISkus } from '../controllers/sql';
import { addRow } from '../controllers/sheet';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response): any => res.json({ message: "Welcome to my API! There's nothing here..." }));
router.get('/:skuId', async (req: Request, res: Response) => {
  const { skuId } = req.params;
  
  // 3350033630314
  const barcodes: IBarcodes | null = await getBarcodes(skuId);
  if (!barcodes)
    return res.json({ error: "SKU introuvable." });
  
  const skus: ISkus | null = await getSkus(barcodes.skuId);
  await addRow({
    'MPX': barcodes.skuId,
    'Code-barre': barcodes.barcode,
    'Asset Fill': barcodes.assetFill,
    'Designation': skus.description,
    'Zones': skus.receivableZones,
  });
  res.json({ success: "Good." });
});

export default router;
