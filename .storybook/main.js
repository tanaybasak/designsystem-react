const path = require("path");
// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ["../src/**/*.stories.@(js|mdx)"],
  addons: [
    "@storybook/addon-knobs",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "./addon-toolbar-1/register",
    "./addon-tab-1/register"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });

    // Return the altered config
    return config;
  }
};
