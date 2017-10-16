import { Request } from 'node-fetch';
import prepareAxios from 'axios-push';
import {
  convertToAxiosRequest,
  convertFromAxiosResponse
} from './axios-converters';

export default function buildFetch(pageResponse) {

  const axios = prepareAxios(pageResponse);
  // axios-push is hopefully temporary,
  // but it's necessary right now because node-fetch doesn't
  // yet use AbortSignal.


  return function fetchPush(input, init) {
    const request = new Request(input, init);
    const axiosRequestConfig = convertToAxiosRequest(request);
    const axiosPromise = axios.request(axiosRequestConfig);

    const responsePromise = axiosPromise.then(convertFromAxiosResponse);
    responsePromise.chain = function chain(...args) {
      // TODO if this method is called, then don't return an empty promise;
      // hold off on sending the push response so that another push_promise
      // can be sent.
      return responsePromise.then(...args);
    };
    return responsePromise;
  };
}
