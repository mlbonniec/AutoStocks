import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

(async () => {
  const barcodes: IBarcodes | null = await getBarcodes('3350033630314');
  const skus: ISkus | null = await getSkus(barcodes.skuId);
  
  await addRow({
    'MPX': barcodes.skuId,
    'Code-barre': barcodes.barcode,
    'Asset Fill': barcodes.assetFill,
    'Designation': skus.description,
    'Zones': skus.receivableZones,
  });
})();
