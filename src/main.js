/*
 * @Description:入口
 * @FilePath: \x6topology\src\main.js
 * @Date: 2021-12-28 17:30:47
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 17:04:03
 * @author: Lin_kangjing
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// svg图标
// import "./assets/svgIcon";
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
