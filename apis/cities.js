import client from './_client';

export function get(params) {
  return client.get("/cities", params);
}
