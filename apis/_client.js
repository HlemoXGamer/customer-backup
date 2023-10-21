let client;

export function setClient(axios) {
  client = axios;
}

const reqMethods = [
  "request",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "patch",
];

let service = {};

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error("apiClient not installed");
    return client[method].apply(null, arguments);
  };
});

export default service;
