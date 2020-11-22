import ospBase from '../data/OSP_BASE.json';

export interface ISku {
  GR_CD: string;
  GR_LB: string;
  RETAILER_PRODUCT_ID: string;
  EAN: number;
}

const data: ISku[] = <any>ospBase;

export default data;
