const apiService = require('../shared/apiService');
const assetsService = require('../shared/assetsService.js');
const serverConfigService = require('../shared/serverConfigService');

/**
 * Return data needed for Landing Subscription page.
 * @param {boolean} [isUS=false] locale
 * @param {boolean} isEurope True if the user is from the EU, false otherwise.
 * @returns {Object} page data for the view.
 */
async function preparePage(isEurope = false) {
	const { isLocal } = serverConfigService;
	const serverData = {
		isEurope,
		isLocal,
	};

	return Promise.all([
		assetsService.getStyles('landing-subscription'),
		assetsService.getScripts(),
	]).then(([styles, scripts]) => ({
		assets: 'landing-subscription',
		scripts,
		serverData,
		styles,
	}));
}

module.exports = {
	preparePage,
};
