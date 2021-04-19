describe('serverConfigService', () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
		delete process.env.NODE_ENV;
	});

	afterEach(() => {
		process.env = OLD_ENV;
	});

	it('should handle the local environment', () => {
		process.env.NODE_ENV = null;

		/* eslint-disable global-require */
		const serverConfigService = require('./serverConfigService');

		expect(serverConfigService.isLocal).toBe(true);
		expect(serverConfigService.isProd).toBe(false);
	});

	it('should handle the production environment', () => {
		process.env.NODE_ENV = 'production';
		process.env.ENV_TYPE = 'PRODUCTION';

		/* eslint-disable global-require */
		const serverConfigService = require('./serverConfigService');

		expect(serverConfigService.isLocal).toBe(false);
		expect(serverConfigService.isProd).toBe(true);
	});

	it('should handle the staging environemnt', () => {
		process.env.NODE_ENV = 'production';
		process.env.ENV_TYPE = 'STAGING';

		/* eslint-disable global-require */
		const serverConfigService = require('./serverConfigService');

		expect(serverConfigService.isLocal).toBe(false);
		expect(serverConfigService.isProd).toBe(false);
	});
});
