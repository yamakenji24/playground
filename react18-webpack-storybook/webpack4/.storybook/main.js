const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpackConfig = require('../webpack.config');

module.exports = {
  features: {
    previewCsfV3: true,
    interactionsDebugger: true,
  },

  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  typescript: {
    check: true,
    checkOptions: {
      tsconfig: './tsconfig.storybook.json',
    },
  },

  webpackFinal: config => {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    config.module.rules = [
      ...webpackConfig.module.rules,
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../stories'),
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['babel-plugin-styled-components', { fileName: false }],
              ],
            },
          },
        ],
      },
    ];
    return config;
  },
}
