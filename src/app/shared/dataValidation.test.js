const dataValidation = require('./dataValidation');

describe('dataValidation', () => {
	describe('validateEmail', () => {
		it('should return true for a valid email address', () => {
			expect(dataValidation.validateEmail('name@domain.com')).toEqual(true);
		});

		it('should return fales for an invalid email address', () => {
			expect(dataValidation.validateEmail('namedomain.com')).toEqual(false);
			expect(dataValidation.validateEmail('name@domain')).toEqual(false);
			expect(dataValidation.validateEmail('name@domain.')).toEqual(false);
			expect(dataValidation.validateEmail('@domain.com')).toEqual(false);
			expect(dataValidation.validateEmail('name@.com')).toEqual(false);
		});

		it('should safety check and return false', () => {
			expect(dataValidation.validateEmail()).toEqual(false);
		});
	});

	describe('validatePhoneNumber', () => {
		it('should return true for a valid email address', () => {
			expect(dataValidation.validatePhoneNumber('123-456-7890')).toEqual(true);
		});

		it('should return fales for an invalid email address', () => {
			expect(dataValidation.validatePhoneNumber('1234567890')).toEqual(false);
			expect(dataValidation.validatePhoneNumber('(123) 456-7890')).toEqual(false);
			expect(dataValidation.validatePhoneNumber('123 456 7890.')).toEqual(false);
			expect(dataValidation.validatePhoneNumber('abc-def-ghij')).toEqual(false);
			expect(dataValidation.validatePhoneNumber('1234-567-890')).toEqual(false);
		});

		it('should safety check and return false', () => {
			expect(dataValidation.validatePhoneNumber()).toEqual(false);
		});
	});

	describe('validateSocialMediaURL', () => {
		it('should return true for a valid LinkedIn link', () => {
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin.com/company/forbes-magazine/', 'linkedin')).toEqual(true);
			expect(dataValidation.validateSocialMediaURL('https://linkedin.com/company/forbes-magazine/', 'linkedin')).toEqual(true);
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin.com/in/forbes-magazine/', 'linkedin')).toEqual(true);
			expect(dataValidation.validateSocialMediaURL('https://linkedin.com/in/forbes-magazine/', 'linkedin')).toEqual(true);
		});

		it('should return fales for an invalid LinkedIn link', () => {
			expect(dataValidation.validateSocialMediaURL('http://www.linkedin.com/company/forbes-magazine/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin.com/forbes-magazine/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin.com/company/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('linkedin.com/in/forbes-magazine/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin.com/in/forbes-/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.linkedin/in/forbes-magazine/', 'linkedin')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('www.linkedin.com/in/forbes-magazine/', 'linkedin')).toEqual(false);
		});

		it('should return true for a valid Twitter link', () => {
			expect(dataValidation.validateSocialMediaURL('https://www.twitter.com/Forbes', 'twitter')).toEqual(true);
			expect(dataValidation.validateSocialMediaURL('https://twitter.com/Forbes', 'twitter')).toEqual(true);
		});

		it('should return fales for an invalid Twitter link', () => {
			expect(dataValidation.validateSocialMediaURL('www.twitter.com/Forbes', 'twitter')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('http://www.twitter.com/Forbes', 'twitter')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.twitter.com/', 'twitter')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.twitter/Forbes', 'twitter')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('twitter.com/Forbes', 'twitter')).toEqual(false);
		});

		it('should return true for a valid Instagram link', () => {
			expect(dataValidation.validateSocialMediaURL('https://www.instagram.com/Forbes', 'instagram')).toEqual(true);
			expect(dataValidation.validateSocialMediaURL('https://instagram.com/Forbes', 'instagram')).toEqual(true);
		});

		it('should return fales for an invalid Instagram link', () => {
			expect(dataValidation.validateSocialMediaURL('www.instagram.com/Forbes', 'instagram')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('http://www.instagram.com/Forbes', 'instagram')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.instagram.com/', 'instagram')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('https://www.instagram/Forbes', 'instagram')).toEqual(false);
			expect(dataValidation.validateSocialMediaURL('instagram.com/Forbes', 'instagram')).toEqual(false);
		});

		it('should safety check and return false', () => {
			expect(dataValidation.validateSocialMediaURL()).toEqual(false);
		});
	});

	describe('validateFbsInsights', () => {
		it('should return true for a valid Forbes Insights link', () => {
			expect(dataValidation.validateForbesInsightsURL('https://www.forbes.com/sites/travisbean/2020/07/18/great-movies-leaving-netflix-july/')).toEqual(true);
			expect(dataValidation.validateForbesInsightsURL('https://www.forbes.com/sites/travisbean/2020/07/18/10-test-article')).toEqual(true);
		});

		it('should return fales for an invalid Forbes Insights link', () => {
			expect(dataValidation.validateForbesInsightsURL('https://www.forbes.com/sites/forbes-magazine/')).toEqual(false);
			expect(dataValidation.validateForbesInsightsURL('https://www.linkedin.com/company/forbes-magazine/')).toEqual(false);
		});

		it('should safety check and return false', () => {
			expect(dataValidation.validateForbesInsightsURL()).toEqual(false);
		});
	});

	describe('validateLink', () => {
		it('should return true for a valid link', () => {
			expect(dataValidation.validateLink('https://www.domain.com/location')).toEqual(true);
		});

		it('should return fales for an invalid link', () => {
			expect(dataValidation.validateLink('http://www.domain.com/location')).toEqual(false);
			expect(dataValidation.validateLink('https://domain.com/location')).toEqual(false);
			expect(dataValidation.validateLink('https://www.domain/location')).toEqual(false);
			expect(dataValidation.validateLink('https://www..com/location')).toEqual(false);
			expect(dataValidation.validateLink('www.domain.com')).toEqual(false);
		});

		it('should safety check and return false', () => {
			expect(dataValidation.validateLink()).toEqual(false);
		});
	});
});
