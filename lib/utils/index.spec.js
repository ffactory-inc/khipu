const Utils = require('./index');

describe("Utils", () => {
  describe("Get path with paramenters", () =>{
    it("should return the path with params", () => {
      const path = Utils.getPathWithParams('banks', {});
      expect(path).toEqual('banks');
    });
    it("should work properly when the query parameter is undefined or null", () => {
      const path = Utils.getPathWithParams('banks', null);
      expect(path).toEqual('banks');
    });
    it("should add new query parameter into path", () => {
      const expectedResult = 'banks?key=123'
      const path = Utils.getPathWithParams('banks', {key: "123"});
      expect(path).toEqual(expectedResult);
    });
  });
});