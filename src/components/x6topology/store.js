/*
 * @Description:拓扑图内部状态管理
 * @FilePath: \x6topology\src\components\X6topology\store.js
 * @Date: 2022-01-06 10:45:20
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-04 15:32:23
 * @author: Lin_kangjing
 */

import Vue from "vue";
export const state = Vue.observable({
  el: "x6topology",
  // 拓扑图对象
  g: null,
  history: null,
  // 单元（节点或边
  cell: null,
  node: null,
  edge: null,
});
// export const state = {
//   g: null,
// };
export const mutations = {
  setGraph(graph) {
    state.g = graph;
  },
  setCell(cell) {
    state.cell = cell;
  },
};
