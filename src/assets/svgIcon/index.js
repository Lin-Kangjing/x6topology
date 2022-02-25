/*
 * @Description:svg图标入口
 * @FilePath: \x6topology\src\assets\svgIcon\index.js
 * @Date: 2022-02-09 11:21:39
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-16 10:52:56
 * @author: Lin_kangjing
 */
import Vue from "vue";
import SvgIcon from "../../components/SvgIcon/SvgIcon.vue"; // svg component
// register globally
Vue.component("svg-icon", SvgIcon);

// 自动导入文件夹中的svg图标，使得增加新图标不用更改之前的代码
const req = require.context("./icons", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
