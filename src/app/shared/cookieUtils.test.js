const jwt = require('jsonwebtoken');
const cookieUtils = require('./cookieUtils');

jest.mock('jsonwebtoken');

afterEach(() => {
	jest.clearAllMocks();
});


describe('cookieUtils', () => {
	describe('getCookie', () => {
		it('should return specific cookie', () => {
			expect(cookieUtils.getCookie('mockCookie1=mock1;mockCookie2=mock2', 'mockCookie2')).toEqual('mockCookie2=mock2');
		});

		it('should not error out', () => {
			expect(cookieUtils.getCookie()).toEqual(undefined);
		});
	});

});
