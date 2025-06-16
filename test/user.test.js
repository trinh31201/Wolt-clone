// test.js
import '@babel/polyfill';            // support for async/await
import supertest from 'supertest';
import { server } from '../server.js';

const requestWithSupertest = supertest(server);

test('GET /config should be implemented according to the spec', async () => {
  const res = await requestWithSupertest.get('/config');
  expect(res.status).toEqual(200);
  expect(res.type).toEqual(expect.stringContaining('json'));
  expect(res.body).toEqual({ version: '0.0.1' });
})