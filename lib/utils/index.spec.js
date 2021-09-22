const Utils = require('./index');

const credentials = {
  secret: 'sshhhh',
  receiverId: '363698',
};

jest.mock('crypto');
describe('Utils', () => {
  describe('Get path with paramenters', () => {
    it('should return the path with params', () => {
      const path = Utils.getPathWithParams('banks', {});
      expect(path).toEqual('banks');
    });
    it('should work properly when the query parameter is undefined or null', () => {
      const path = Utils.getPathWithParams('banks', null);
      expect(path).toEqual('banks');
    });
    it('should add new query parameter into path', () => {
      const expectedResult = 'banks?key=123';
      const path = Utils.getPathWithParams('banks', { key: '123' });
      expect(path).toEqual(expectedResult);
    });
  });
  describe('Hmac sha256', () => {
    it('should return encrypted data', () => {
      const expectedResult = 'sshhhh';
      const dataEncrypted = Utils.hmacSha256('sshhhh', 'aadfa');
      expect(dataEncrypted).toEqual(expectedResult);
    });
  });
  describe('Authorization Header', () => {
    it('should return a validation exception because the URL is not defined', () => {
      try {
        Utils.getAuthorizationHeader(null, 'POST', null, null, credentials);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.status).toEqual(400);
        expect(error.message).toEqual('Url must be defined.');
      }
    });
    it('should return a validation exception because the request method is not defined', () => {
      try {
        Utils.getAuthorizationHeader(
          'https://khipu.com/banks',
          null,
          null,
          null,
          credentials
        );
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.status).toEqual(400);
        expect(error.message).toEqual('Request method must be defined.');
      }
    });
    it('should return a validation exception because the khipu credentials is not defined', () => {
      try {
        Utils.getAuthorizationHeader(
          'https://khipu.com/banks',
          'POST',
          null,
          null,
          null
        );
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.status).toEqual(400);
        expect(error.message).toEqual('Credentials should be defined.');
      }
    });
    it('should return authorization heder', () => {
      const authorization = Utils.getAuthorizationHeader(
        'https://khipu.com/banks',
        'POST',
        { foo: 'k' },
        { poo: 'z' },
        credentials
      );
      expect(authorization).toEqual('363698:sshhhh');
    });
  });
  describe('Verify if a string is JSON object', () => {
    it('should return false because the string to evaluate is null', () => {
      const isJson = Utils.isJson(null);
      expect(isJson).toBeFalsy();
    });
    it('should return false because the string is not a JSON object', () => {
      const isJson = Utils.isJson('this is not JSON object');
      expect(isJson).toBeFalsy();
    });
    it('should return true because the string is a JSON object', () => {
      const isJson = Utils.isJson(JSON.stringify(credentials));
      expect(isJson).toBeTruthy();
    });
  });
  describe('Mapped data to API DTO', () => {
    it('should return a validation exception because data to mapping is not defined', () => {
      try {
        const result = Utils.mapper(null);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.status).toEqual(400);
        expect(error.message).toEqual('Data object should be defiened.');
      }
    });
    it('should return an empty object', () => {
      const result = Utils.mapper({});
      expect(result).toBeDefined();
      expect(result).toEqual({});
    });
    it('should return a mapped object', () => {
      const result = Utils.mapper({ paymentId: '1221', creditCard: '854cc' });
      expect(result).toBeDefined();
      expect(result).toEqual({ payment_id: '1221', credit_card: '854cc' });
    });
  });
  describe('Validate schema Khipu Credentials', () => {
    it('should return a validation exception, becuase the crendential are not defined', () => {
      const [isValid, value] = Utils.areValidCredentials(undefined);
      expect(isValid).toBeFalsy();
      expect(value).toBeDefined();
      expect(value.status).toEqual(400);
      expect(value.message).toEqual('Credentials should be defined.');
    });
    it('should return a validation error, because the credentials are empty', () => {
      const [isValid, value] = Utils.areValidCredentials({ secret: '' });
      expect(isValid).toBeFalsy();
      expect(value).toBeDefined();
      expect(value.status).toEqual(400);
      expect(value.message).toEqual('"secret" is not allowed to be empty');
    });
    it('should return a validation error, because the credentials have not corret schema', () => {
      const [isValid, value] = Utils.areValidCredentials({
        secret: 'ddd',
        t: '5555',
      });
      expect(isValid).toBeFalsy();
      expect(value).toBeDefined();
      expect(value.status).toEqual(400);
      expect(value.message).toEqual('"receiverId" is required');
    });
    it('should return a valid credential object', () => {
      const [isValid, value] = Utils.areValidCredentials(credentials);
      expect(isValid).toBeTruthy();
      expect(value).toBeDefined();
    });
  });
});
