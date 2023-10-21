import client from './_client';

export function get() {
  const url = this.$auth.loggedIn ? "/checkout" : "/guest/checkout";

  return client.get(url);
}
export function add(data) {
  const url = this.$auth.loggedIn ? "/checkout" : "/guest/checkout";

  return client.post(url, data);
}

export function complete(data) {
  // // alert(JSON.stringify((data, null, 4)))
  let url = "";
  if (this.$auth.loggedIn) {
    url = "/customer/create/order"
  } else {
    url = "/guest-apis/order"
  }


  return client.post(url, data);
}
export function applyCoupon(checkout_id, coupon) {
  const url = this.$auth.loggedIn
    ? `/checkout/${checkout_id}/applyCoupon`
    : `/guest/checkout/${checkout_id}/applyCoupon`;

  return client.patch(url, { coupon });
}
export function removeDiscount(checkout_id, discount_id) {
  const url = this.$auth.loggedIn
    ? `checkout/${checkout_id}/${discount_id}/remove`
    : `/guest/checkout/${checkout_id}/${discount_id}/remove`;

  return client.patch(url);
}
export function createAccount(data) {
  return client.post("/guest/checkout/createAccount", data);
}

export function checkVoucher(data) {
  return client.post("/customer/voucher/check", data);
}