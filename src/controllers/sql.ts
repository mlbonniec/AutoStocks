import { Connection, createConnection, RowDataPacket } from 'mysql2/promise';

async function connectToSQL(): Promise<Connection> {
  return await createConnection({
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  });
}

export async function getBarcodes(barcode: string): Promise<RowDataPacket | null> {
  const connection = await connectToSQL();
  
  const [rows] = await connection.execute('SELECT skuId, barcode, assetFill FROM barcodes WHERE barcode = ?', [barcode]);
  console.log(rows)
  
  if (rows[0])
    return rows[0];
  
  return null;
}

export async function getSkus(skuId: string): Promise<RowDataPacket | null> {
  const connection = await connectToSQL();
  
  const [rows] = await connection.execute('SELECT description, receivableZones FROM skus WHERE skuId = ?', [skuId]);
  
  if (rows[0])
    return rows[0];
  
  return null;
}
