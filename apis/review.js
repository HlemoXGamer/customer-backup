import client from './_client';

export function store(product_id, data) {
  return client.post(`products/${product_id}/review`, { ...data, product_id });
}
