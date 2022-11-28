const withSourceMaps = require('@zeit/next-source-maps')();
const { execSync } = require("child_process");
// const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = withSourceMaps({
  env: {
    dsn: "https://a53607470ed149e9a40453e64695f912@ops-sentry.knowre.com/3", // self hosted
    // dsn: "https://41401bf03df24e8f91ad96aac7a8a55f@o4504208246833152.ingest.sentry.io/4504234926407680", // SAAS
    release: execSync('git rev-parse HEAD').toString()
  },
  webpack(config, options) {
    // https://github.com/getsentry/sentry-javascript/issues/2378
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // SentryCliPlugin - Use only when running the production app. This will keep generating and uploading source maps
    // on every render if used in dev.

    // config.plugins.push(
    //   new SentryCliPlugin({
    //     include: '.next',
    //     ignore: ['node_modules'],
    //     urlPrefix: '~/_next',
    //     release: execSync('git rev-parse HEAD').toString()
    //   })
    // )
    return config
  }
});