const request = require('request');

/**
 * Makes an API call.
 * @param {String} url call url.
 * @param {Object} headers call header.
 * @param {String} method call method(POST/GET/...).
 * @param {Object} body call body.
 * @returns {Promise} response.
 */
function requestCall(url, headers, method, body) {
	const options = {
		url: encodeURI(url),
		headers,
		body: headers['Content-Type'] === 'application/json' ? JSON.stringify(body) : body,
		method,
	};

	return new Promise((resolve, reject) => {
		request(options, (err, res) => {
			if (!err && (res.statusCode === 200 || res.statusCode === 201)) {
				const info = JSON.parse(res.body);
				resolve(info);
			} else {
				reject((res || {}).body);
			}
		});
	});
}

module.exports = {
	requestCall,
};
