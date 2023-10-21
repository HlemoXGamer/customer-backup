import client from './_client';

export function get(key) {
  return client.get("/list", { params: { key } });
}
export function getBrands() {
  return get("product_brands");
}
export function getProductSizes() {
  return get("product_sizes");
}
export function getGeneralPreferences() {
  return get("product_general_preferences");
}
