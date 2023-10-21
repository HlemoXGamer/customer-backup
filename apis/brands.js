import client from './_client';

export function get(params = {}) {
  return client.get("/list", {
    params: {
      key: "product_brands",
      ...params,
    },
  });
}
