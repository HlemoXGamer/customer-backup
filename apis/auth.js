import client from './_client';

export function guest() {
  return client.get("/csrf-cookie");
}

export function forgetPassword (data) {
  return client.post('/auth/forget-password', data)
}

export function resetPassword (data) {
  return client.post('/auth/reset-password', data)
}

export function register(data) {
  return client.post("/auth/register", data);
}
export function updateUser(data) {
  return client.post("/user/update", data);
}

export function changePassword (data) {
  return client.post("/user/change-password", data);
}

export function login(data) {
  return client.post('/auth/login', data)
}