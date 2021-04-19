const moment = require('moment-timezone');
const httpsService = require('./httpsService');
const serverConfigService = require('./serverConfigService');

const headers = {
	'Cache-Control': 'private, no-cache, no-store, must-revalidate',
	accept: 'application/json',
	Pragma: 'no-cache',
	Expires: '-1',
};


