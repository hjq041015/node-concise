import { Product } from "../types/product";
import { getConfig } from "../utils/configHelper";

const BASE_URL = getConfig("BASE_URL");

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL);
  const result = await response.json();

  return result;
}

export async function addProduct(product: Product) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  return result;
}
