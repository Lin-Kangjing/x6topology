/*
 * @Description:
 * @FilePath: \x6topology\src\router\index.js
 * @Date: 2021-12-28 17:30:47
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2021-12-28 17:33:35
 * @author: Lin_kangjing
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
