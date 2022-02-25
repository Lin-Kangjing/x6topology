/*
 * @Description:
 * @FilePath: \x6topology\vue.config.js
 * @Date: 2022-02-16 10:19:29
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-16 10:23:17
 * @author: Lin_kangjing
 */
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
const vueConfig = {
  chainWebpack: (config) => {
    // svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/svgIcon/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svgIcon/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
};

module.exports = vueConfig;
