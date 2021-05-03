const apiService = require('../shared/apiService');
const assetsService = require('../shared/assetsService.js');
const serverConfigService = require('../shared/serverConfigService');


/**
 * Return data needed for admin dashboard page.
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
		assetsService.getStyles('admin-dashboard'),
		assetsService.getScripts(),
	]).then(([styles, scripts]) => ({
		assets: 'admin-dashboard',
		scripts,
		serverData,
		styles,
	}));
}

module.exports = {
	preparePage,
};
