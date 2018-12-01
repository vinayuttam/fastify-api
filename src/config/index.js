/**
 * Dependencies
 */
const defaultConfig = require('./env/base.config');

const resolvingConfig = () => {
  const environment = process.env.NODE_ENV || 'development';
  const environmentPath = `./env/${environment}.config`;

  const environmentConfig = require(environmentPath); // eslint-disable-line

  const config = Object.assign({}, defaultConfig, environmentConfig);
  return config;
};

module.exports = resolvingConfig();
