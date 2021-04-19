const path = require('path');
const util = require('util');
const serverConfigService = require('./serverConfigService');

// Mock util.promisify before initializing assetsService so that
// the readFile method uses the mock
const promise = jest.fn();
util.promisify = jest.fn(() => promise);

const assetsService = require('./assetsService');

describe('assetsService', () => {

});
