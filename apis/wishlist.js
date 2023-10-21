import client from './_client';

export function get() {
  return client.get("/wishlist");
}
export function add(product_id) {
  return client.post("/wishlist", { product_id });
}
export function remove() {
  return client.delete("/wishlist");
}
