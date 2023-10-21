import client from './_client';

export function show(id) {
  if (client.loggedIn) {
    return client.get("/customer/branches/" + id);
  } else {
    return client.get("/guest-apis/branches/" + id);
  }

}
