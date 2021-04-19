/**
 * Validates email address
 * @param {String} email The email in need of validation
 * @returns {Boolean} True if valid
 */
const validateEmail = (email = '') => {
	// eslint-disable-next-line max-len, no-useless-escape
	const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	return emailRegex.test(email);
};

/**
 * Validates phone number
 * @param {String} phoneNumber The phone number in need of validation
 * @returns {Boolean} True if valid
 */
const validatePhoneNumber = (phoneNumber = '') => {
	const phoneNumberRegex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);

	return phoneNumberRegex.test(phoneNumber);
};

/**
 * Validates Social media URL
 * @param {String} link in need of validation
 * @param {String} siteName in need for name of site
 * @returns {Boolean} True if valid
 */
const validateSocialMediaURL = (link = '', siteName = '') => {
	let linkRegex;

	if (siteName === 'linkedin') {
		linkRegex = new RegExp(/^(https:\/\/(www\.)?linkedin\.com\/(in\/|company\/))[a-z]+([-._]{1}[a-z0-9]+)?(\/.*)?$/igm);
	} else if (siteName !== '') {
		linkRegex = new RegExp(`^(https:\\/\\/(www\\.)?${siteName}\\.com\\/)[a-z]+([-._]{1}[a-z0-9]+)?(\\/.*)?$`, 'igm');
	} else {
		linkRegex = new RegExp(/^(https:\/\/www\.)[a-z]+([-.]{1}[a-z0-9]+)*\.[com]{3}?(\/.*)?$/igm);
	}

	return linkRegex.test(link);
};


/**
 * Validates external Links
 * @param {String} url The url in need of validation
 * @returns {Boolean} True if valid
 */
const validateLink = (url = '') => {
	const linkRegex = new RegExp(/^(https:\/\/www\.)[a-z]+([-.]{1}[a-z0-9]+)*\.[com]{3}?(\/.*)?$/igm);

	return linkRegex.test(url);
};

module.exports = {
	validateEmail,
	validatePhoneNumber,
	validateSocialMediaURL,
	validateLink,
};
