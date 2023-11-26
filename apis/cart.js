import client from './_client';

export function get(area_id) {
  const url = this.$auth.loggedIn ? "/customer/get-cart-products" : "/guest-apis/get-cart-products";

  return client.get(url, {params: {area_id}});
}

export function add(id, data) {
  const url = this.$auth.loggedIn ? "/customer/add-cart-product" : "/guest-apis/add-cart-product";

  return client.post(`${url}/${id}`, data);
}

export function update(id, data) {
  const url = this.$auth.loggedIn ? "/orders" : "/orders";

  return client.patch(`${url}/${id}`, data);
}

export function remove(id) {
  const url = this.$auth.loggedIn ? "/customer/delete-cart-product" : "/guest-apis/delete-cart-product";

  return client.delete(`${url}/${id}`);
}

export function removeAll() {
  const url = this.$auth.loggedIn ? "/orders" : "/orders";

  return client.delete(`${url}/all`);
}

export function removeCart(cart_id, loggedIn) {
  const url = loggedIn ? "/customer/cart" : "/guest-apis/cart";

  return client.delete(`${url}/${cart_id}`);
}
