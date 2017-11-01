import chai, { assert } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import buildFetch from '../src/browser';

chai.use(sinonChai);

describe('buildFetch for the browser', () => {

  afterEach(() => {
    delete global.window;
  });

  it('builds fetch', () => {
    const fetch = buildFetch(null, { fetch: sinon.spy() });
    assert.isFunction(fetch);
  });
});
