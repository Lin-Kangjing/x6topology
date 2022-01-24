/*
 * @Description:
 * @FilePath: \x6topology\.eslintrc.js
 * @Date: 2021-12-28 17:30:47
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-05 10:23:48
 * @author: Lin_kangjing
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
