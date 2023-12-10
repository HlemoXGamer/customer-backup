import client from './_client';

export function get (query) {
  return client.get(`/time-slot?area=${query}`);
}
