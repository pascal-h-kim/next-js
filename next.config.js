const withSourceMaps = require('@zeit/next-source-maps')();
const { execSync } = require("child_process");
// const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = withSourceMaps({
  env: {
    dsn: "https://2a538c386aad46f2bd1b8fea964008e3@ops-sentry.knowre.com/37",
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