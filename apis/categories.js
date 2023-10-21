import client from './_client';

export function get(params = {}, guest) {
  if (guest) {
    return client.get("/guest-apis/categories", { params });
  }
  return client.get("/customer/categories", {
    params,
  });
}

export function categoryView(data) {
  return client.post("/customer/categoryView", data);
}
