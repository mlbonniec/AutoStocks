import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { getBarcodes, getSkus, IBarcodes, ISkus } from './controllers/sql';
import loadSheet from './controllers/load-sheet';

(async () => {
  const sheet: GoogleSpreadsheetWorksheet = await loadSheet();

  const barcodes: IBarcodes | null = await getBarcodes('3350033630314');
  const skus: ISkus | null = await getSkus(barcodes.skuId);
  
  await sheet.addRow({
    'MPX': barcodes.skuId,
    'Code-barre': barcodes.barcode,
    'Asset Fill': barcodes.assetFill,
    'Designation': skus.description,
    'Zones': skus.receivableZones,
  });
})();
