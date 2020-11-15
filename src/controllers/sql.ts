import { Connection, createConnection, RowDataPacket } from 'mysql2/promise';

export interface IBarcodes {
  skuId: string;
  barcode: string;
  assetFill: string;
}

export interface ISkus {
  description: string;
  receivableZones: string;
}

async function connectToSQL(): Promise<Connection> {
  return await createConnection({
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // Make MAMP compatible on UNIX
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
}

export async function getBarcodes(barcode: string): Promise<IBarcodes|null> {
  const connection = await connectToSQL();
  
  const [rows] = await connection.execute('SELECT skuId, barcode, assetFill FROM barcodes WHERE barcode = ?', [barcode]);
  
  if (rows[0])
    return rows[0];
  
  return null;
}

export async function getSkus(skuId: string): Promise<ISkus|null> {
  const connection = await connectToSQL();
  
  const [rows] = await connection.execute('SELECT description, receivableZones FROM skus WHERE skuId = ?', [skuId]);
  
  if (rows[0])
    return rows[0];
  
  return null;
}
