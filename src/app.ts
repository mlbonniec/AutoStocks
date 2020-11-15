import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { getBarcodes, getSkus } from './controllers/sql';
import loadSheet from './controllers/load-sheet';

(async () => {
  const sheet: GoogleSpreadsheetWorksheet = await loadSheet();
  
  const sheetRow: object = {};
  const codebar: string = '3350033630314' // Temporary
  
  const barcode = await getBarcodes(codebar);
  const skus = await getSkus(barcode.skuId);
  
  sheetRow['MPX'] = barcode.skuId;
  sheetRow['Code-barre'] = barcode.barcode;
  sheetRow['Asset Fill'] = barcode.assetFill;
  
  sheetRow['Designation'] = skus.description;
  sheetRow['Zones'] = skus.receivableZones;
  
  // console.log(barcode);
  // console.log(skus);
  
  await sheet.addRow({ ...sheetRow });
})();
