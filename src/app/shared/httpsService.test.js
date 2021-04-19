const request = require('request');
const httpsService = require('./httpsService');

jest.mock('request');

describe('httpsService', () => {
	describe('should request from the API', () => {
		it('should handle application/x-www-form-urlencoded content type requests', async () => {
			// requestCall passes a callback to request method,
			// so call the callback with fake data
			request.mockImplementationOnce(() => request.mock.calls[0][1](null, {
				statusCode: 200,
				body: '{"data": "test-data"}',
			}));

			const result = await httpsService.requestCall('url', { 'Content-Type': 'application/x-www-form-urlencoded' }, 'method', 'body');

			expect(result).toEqual({ data: 'test-data' });
			expect(request.mock.calls[0][0]).toEqual({
				body: 'body', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, method: 'method', url: 'url',
			});
			request.mockClear();
		});

		it('should handle application/json content type requests', async () => {
			// requestCall passes a callback to request method,
			// so call the callback with fake data
			request.mockImplementationOnce(() => request.mock.calls[0][1](null, {
				statusCode: 200,
				body: '{"data": "test-data"}',
			}));

			const result = await httpsService.requestCall('url', { 'Content-Type': 'application/json' }, 'method', { body: 'body' });

			expect(result).toEqual({ data: 'test-data' });
			expect(request.mock.calls[0][0]).toEqual({
				body: '{"body":"body"}', headers: { 'Content-Type': 'application/json' }, method: 'method', url: 'url',
			});
			request.mockClear();
		});
	});

	it('should throw if request fails', async () => {
		request.mockImplementationOnce(() => request.mock.calls[0][1](null, {
			statusCode: 404,
			body: '{"data": "err"}',
		}));

		try {
			await httpsService.requestCall('url', { 'Content-Type': 'application/json' }, 'method', { body: 'body' });
		} catch (error) {
			expect(error).toEqual('{"data": "err"}');
			expect(request.mock.calls[0][0]).toEqual({
				body: '{"body":"body"}', headers: { 'Content-Type': 'application/json' }, method: 'method', url: 'url',
			});
		}
		request.mockClear();
	});

	it('should throw if request and not error out if no res body was found', async () => {
		request.mockImplementationOnce(() => request.mock.calls[0][1]({ error: 'error' }, null));

		try {
			await httpsService.requestCall('url', { 'Content-Type': 'application/json' }, 'method', { body: 'body' });
		} catch (error) {
			expect(error).toEqual(undefined);
			expect(request.mock.calls[0][0]).toEqual({
				body: '{"body":"body"}', headers: { 'Content-Type': 'application/json' }, method: 'method', url: 'url',
			});
		}
	});
});
