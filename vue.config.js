const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8088,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'));
  },
});
