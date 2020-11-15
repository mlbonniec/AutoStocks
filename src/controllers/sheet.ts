import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

async function loadSheet() {
  const spreadsheet: GoogleSpreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEETS_ID);
  await spreadsheet.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await spreadsheet.loadInfo();

  return spreadsheet.sheetsById[process.env.GOOGLE_SHEET_ID];
}

export async function addRow(row: object): Promise<void> {
  const sheet: GoogleSpreadsheetWorksheet = await loadSheet();
  
  await sheet.addRow(<any>row);
}
