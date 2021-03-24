const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    './addon-toolbar-1/register',
    './addon-tab/register'
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  }
};
