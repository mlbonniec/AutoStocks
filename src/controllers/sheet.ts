import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { ProductData } from './data';

declare class ISpreadSheet {
  constructor(spreadsheetID: string, worksheetID: string);

  init(): Promise<void>;
  addRow(row: ProductData): Promise<void>;
}

class SpreadSheet implements ISpreadSheet {
  public readonly spreadsheet: GoogleSpreadsheet;
  private readonly worksheetID: string;
  private worksheet: GoogleSpreadsheetWorksheet;
  
  constructor(spreadsheetID: string, worksheetID: string) {
    this.spreadsheet = new GoogleSpreadsheet(spreadsheetID);
    this.worksheetID = worksheetID;
  }
  
  public async init(): Promise<void> {
    await this.spreadsheet.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    
    await this.spreadsheet.loadInfo();
    
    this.worksheet = this.spreadsheet.sheetsById[this.worksheetID];
  }
  
  public async addRow(row: ProductData): Promise<void> {
    await this.worksheet.addRow(<any>row);
  }
}

export default SpreadSheet;
