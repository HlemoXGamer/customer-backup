import client from './_client';

export function get(params = {}) {
  return client.get("/collections", { params });
}
export function show(id) {
  return client.get(`/collections/${id}`);
}
export function products(id) {
  return client.get(`/collections/${id}/products`);
}
