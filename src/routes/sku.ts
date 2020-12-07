import { Router, Request, Response } from 'express';
import { getProductData, ProductData } from '../controllers/data';
import Sheet from '../controllers/sheet';

const router = Router();
const sheet = new Sheet(process.env.GOOGLE_SPREADSHEETS_ID, process.env.GOOGLE_SHEET_ID);

router.post('/:skuId', async (req: Request, res: Response) => {
  const { skuId } = req.params;

  try {
    const data: ProductData | null = await getProductData(skuId);
    if (!data)
      return res.status(404).json({ error: 'Product not found.' });
      
    await sheet.init();
    await sheet.addRow(data);

    res.status(200).json(data);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production')
      console.error(e);

    res.status(500).json({ error: 'An internal error has occured. Please try again later.' });
  }
});

export default router;
