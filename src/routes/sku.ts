import { getBarcodes, getSkus, IBarcodes, ISkus } from '../controllers/sql';
import { addRow } from '../controllers/sheet';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/:skuId', async (req: Request, res: Response) => {
  const { skuId } = req.params;
  // sku id example: 3350033630314

  try {
    const barcodes: IBarcodes | null = await getBarcodes(skuId);
    if (!barcodes)
      return res.status(404).json({ error: 'SKU not found.' });

    const skus: ISkus | null = await getSkus(barcodes.skuId);
    await addRow({
      'MPX': barcodes.skuId,
      'Code-barre': barcodes.barcode,
      'Asset Fill': barcodes.assetFill,
      'Designation': skus.description,
      'Zones': skus.receivableZones,
    });

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An internal error has occured. Please try again later.' })
  }
});

export default router;
