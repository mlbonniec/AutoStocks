import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function () {
  const doc: GoogleSpreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEETS_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();

  return doc.sheetsById[process.env.GOOGLE_SHEET_ID];
}
