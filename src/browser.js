
export default function buildFetch(pageResponse, { fetch = global.fetch }) {
  return function fetchPush(...args) {
    const result = fetch(...args);
    result.chain = result.then;
    return result;
  };
}
