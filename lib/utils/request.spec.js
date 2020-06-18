const request = require('./request');

const getReqOtions = {
  hostname: 'khipu.com',
  path: '/api/2.0/banks',
  port: 443,
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'node-client',
    Authorization:
      '313980:2b9b2ea7ddf369238e31f6360f78445df53d68be671f209e722f790c4eda2e8c',
  },
};

const postReqOptions = {
  hostname: 'khipu.com',
  path: '/api/2.0/payments',
  port: 443,
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'node-client',
    Authorization: '313980:d78649314f7758db6298a091fadae0dc26cb37f3d745fc2d383523fd7fa883b1'
  }
}

jest.mock('https');
describe('HTTPS api requets ', () => {
  it('should return a validation exception, because the request options are empty', async (done) => {
    try {
      const response = await request({});
      done();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.status).toEqual(400);
      done();
    }
  });
  it('should do GET request', async (done) => {
    try {
      const response = await request(getReqOtions, null);
      expect(response).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
  });
  it('should do POST request', async (done) => {
    try {
      const response = await request(postReqOptions, {
        amount: 10000,
        currency: 'BOB',
        subject: 'Por servicio de electricidad',
        transaction_id: 'TP-12145'
      });
      expect(response).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
  });
});
