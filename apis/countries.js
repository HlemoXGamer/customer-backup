import client from './_client';

export function get() {
  return client.get("/countries");
}
