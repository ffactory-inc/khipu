
const EventEmitter = require('events');

const resEmitter = new EventEmitter();
const https = jest.genMockFromModule('https');

https.request = jest.fn(function(requestOptions, callback) {
  resEmitter.setEncoding = jest.fn(() => {});
  setTimeout(()=> resEmitter.emit('data', JSON.stringify({a: 'f'})), 100);
  setTimeout(()=> resEmitter.emit('end'), 120);
  callback(resEmitter)
  return {
    on: jest.fn(() => {}),
    end: jest.fn(() => {}),
    write: jest.fn(() => {})
  }
});

module.exports = https;