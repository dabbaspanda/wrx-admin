const jwt = require('jsonwebtoken');

/**
 * Parses through the cookie string and returns a cookie matching the name given to the function along with its value.
 *
 * @param {String} cookies The cookie string to parse through.
 * @param {String} cookieName The name of the cookie to get.
 * @returns {String} The cookie with the requested name and its value.
 */
const getCookie = (cookies = '', cookieName) => (cookies.split(';').find((cookie) => (cookie.indexOf(`${cookieName}=`) > -1)));

module.exports = {
	getCookie,
};
