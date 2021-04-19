const isLocal = process.env.NODE_ENV !== 'production';

const isProd = process.env.ENV_TYPE === 'PRODUCTION';


module.exports = {
	isLocal,
	isProd,
};
