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

    let chainedRequest = false;

    const axiosRequestConfig = convertToAxiosRequest(request);
    axiosRequestConfig.chainedRequest = () => chainedRequest;
    const axiosPromise = axios.request(axiosRequestConfig);

    const responsePromise = axiosPromise.then(convertFromAxiosResponse);
    responsePromise.chain = function chain(...args) {
      chainedRequest = true;
      return responsePromise.then(...args);
    };
    return responsePromise.then(convertFromAxiosResponse);
  };
}
