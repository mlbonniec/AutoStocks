import { Router, Request, Response } from 'express';
import data, { ISku } from '../controllers/data';
import Sheet from '../controllers/sheet';

const router = Router();
const sheet = new Sheet(process.env.GOOGLE_SPREADSHEETS_ID, process.env.GOOGLE_SHEET_ID);

router.post('/:skuId', async (req: Request, res: Response) => {
  const { skuId } = req.params;

  try {    
    const row: ISku = data.find((e: ISku) => e.EAN === parseInt(skuId, 10))
    if (!row)
      return res.status(404).json({ error: 'SKU not found.' });
    
    await sheet.init();
    await sheet.addRow(row);

    res.status(200).send(row);
  } catch (e) {
    if (process.env.NODE_ENV === 'production')
      console.error(e);

    res.status(500).json({ error: 'An internal error has occured. Please try again later.' })
  }
});

export default router;
