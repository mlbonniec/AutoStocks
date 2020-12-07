import axios from 'axios';

export interface ProductData {
  brands: string;
  image: string;
  ingredients: string;
  quantity: string;
  ean: string;
  name: string;
}

async function getProductData(barcode: string): Promise<ProductData | null> {
  try {
    const { data: { status, product } } = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}`);

    if (status === 0)
      return null;

    return {
      ean: product.code,
      name: product.product_name,
      image: product.image_url,
      ingredients: product.ingredients_text_en || product.ingredients_text,
      quantity: product.quantity,
      brands: product.brands,
    };
  } catch (e) {
    console.error(e);
    console.log('erreur');
  }
}

export { getProductData };
