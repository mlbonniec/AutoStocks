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
      return res.json({ error: "SKU not found." });

    const skus: ISkus | null = await getSkus(barcodes.skuId);
    await addRow({
      'MPX': barcodes.skuId,
      'Code-barre': barcodes.barcode,
      'Asset Fill': barcodes.assetFill,
      'Designation': skus.description,
      'Zones': skus.receivableZones,
    });

    res.json({ success: "Good." });
  } catch (e) {
    console.error(e);
    res.json({ error: "Internal Error." });
  }
});

export default router;
