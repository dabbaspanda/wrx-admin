const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const serverConfigService = require('./serverConfigService');

/**
 * Determines whether we should load these assets from local or head end
 */
function getAssetsPrefix() {
	return serverConfigService.isLocal ? '' : '';
}

/**
 * Gets the scripts from the dist based on their hash
 */
function getScripts() {
	const assetPrefix = getAssetsPrefix();

	return readFile(path.join(__dirname, '../../../dist/webpack.assets.json'), 'utf8')
		.then(JSON.parse)
		.then((assets) => (
			{
				landingSubscription: `${assetPrefix}/admin/dist/js/${assets.landingSubscription.js}`,
			}
		));
}

/**
 * Gets the inline styles for the page
 * @param {string} style The name of the css file to load
 */
function getStyles(style) {
	return readFile(path.join(__dirname, `../../../dist/css/${style}.css`), 'utf8');
}

module.exports = {
	getScripts,
	getStyles,
};
