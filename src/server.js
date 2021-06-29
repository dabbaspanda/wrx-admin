
const compression = require('compression');
const express = require('express');
const path = require('path');
const serverConfigService = require('./app/shared/serverConfigService');

/* istanbul ignore next */
const dotenvConfig = {
	debug: serverConfigService.isLocal,
	path: `${serverConfigService.isLocal ? '' : '/'}vault/secrets/app`,
};
require('dotenv').config(dotenvConfig);

const cookieUtils = require('./app/shared/cookieUtils');
const adminDashboardService = require('./app/adminDashboardService.js');
const apiService = require('./app/shared/apiService.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.set('etag', false);
app.disable('view cache');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use('/admin/dist/js/', express.static(path.resolve(__dirname, '../dist/js/')));
app.use('/admin/dist/css/', express.static(path.resolve(__dirname, '../dist/css/')));
app.use((req, res, next) => {
	const { origin = '' } = req.headers;
	res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Cache-Control, Pragma');
	res.header('Access-Control-Allow-Credentials', true);
	// https://docs.fastly.com/en/guides/configuring-caching#do-not-cache
	res.setHeader('Cache-Control', 'private, no-cache, no-store');

	if (req.originalUrl !== '/status') {
		console.log(`Serving ${req.originalUrl} - ${JSON.stringify(req.headers)}`);
	}

	return next();
});


/**
 * Serves Admin Dashboard page.
 * @param {Object} req request.
 * @param {Object} res response.
 */
async function serveAdminDashboard(req, res) {
	const isEurope = req.headers['x-is-eu'] === 'true';
	const data = await adminDashboardService.preparePage(isEurope);
	res.header('Vary', 'X-Country-Code');
	res.render('admin-dashboard', data);
}

app.get('/', serveAdminDashboard);

// Status page
app.get('/status', (req, res) => {
	res.send('200 OK');
});

// You define error-handling middleware last, after other app.use() and routes calls
// See https://expressjs.com/en/guide/error-handling.html
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	err.title = err.title || 'Error';
	console.error(err.title, err.message);
	/* istanbul ignore next */
	res.sendStatus(err.code || 500);
});

const server = app.listen(process.env.LISTEN_PORT || 3000, () => {
	console.log('Listening at http://%s:%s', server.address().address, server.address().port);
});

module.exports = {
	app,
	server,
};

