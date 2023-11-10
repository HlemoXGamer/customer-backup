import client from './_client';


export function get(params = {}, guest) {
  const shipping_type = localStorage.getItem("shipping_type");
  if(shipping_type == "pre-order"){
    params["menuType"] = "pre-order"
  }
  if (guest) {
    return client.get("/guest-apis/products", { params });
  }
  return client.get("/customer/products", { params });
}

export function show(slug) {
  return client.get(`/products/${slug}`);
}

export function new_arrivals() {
  return client.get("/products/new_arrivals");
}

export function getAll() {
  return client.get("/customer/products");
}

export function productView(data) {
  return client.post("/customer/productView", data);
}