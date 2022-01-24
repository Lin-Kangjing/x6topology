/*
 * @Description:拓扑图内部状态管理
 * @FilePath: \x6topology\src\components\x6topology\store.js
 * @Date: 2022-01-06 10:45:20
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-17 14:28:14
 * @author: Lin_kangjing
 */

import Vue from "vue";
export const state = Vue.observable({
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
