import { Response } from 'node-fetch';

function getAxiosRequestHeaders(request) {
  const headersObj = {};
  request.headers.forEach((value, key) => {
    headersObj[key] = value;
  });
  // TODO request.cache
  return headersObj;
}

export function convertToAxiosRequest(request) {
  return {
    url: request.url,
    method: request.method,
    headers: getAxiosRequestHeaders(request),

    // Not supporting request body, because this will only be for GET.

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: request.credentials === 'include',
    // TODO FederatedCredential/PasswordCredential
    // Or just wait until I replace axios-push with node-fetch.

    responseType: 'stream'

    // TODO cancelToken -> request.signal
  };
}

export function convertFromAxiosResponse(response) {
  // TODO eventually want to give devs the ability to chain requests
  // on the server-side, so will need to return data. Not sure if this will be
  // before or after I get rid of the axios-push dependency.
  return new Response();
}
