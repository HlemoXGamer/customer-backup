import client from './_client';

export function get() {
  const url = "/customer/notifications";

  return client.get(url);
}

export function update(payload) {
  const url = "/customer/notifications";

  return client.post(url);
}
