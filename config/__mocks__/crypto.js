const crypto = jest.genMockFromModule('crypto');

crypto.createHmac = jest.fn(function (algorith, secret) {
  return {
    update: jest.fn(function (data) {
      return {
        digest: jest.fn(function (algorith) {
          return 'sshhhh';
        }),
      };
    }),
  };
});

module.exports = crypto;
