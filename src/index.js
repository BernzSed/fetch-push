import { Request } from 'node-fetch';
import prepareAxios from 'axios-push';

export default function buildFetch(pageResponse) {

  const axios = prepareAxios(pageResponse);
  // axios-push is hopefully temporary,
  // but it's necessary right now because node-fetch doesn't
  // yet use AbortSignal


  return function fetchPush(input, init) {
    const request = new Request(input, init);

    // TODO
  };
}
