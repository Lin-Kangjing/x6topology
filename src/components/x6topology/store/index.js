/*
 * @Description:拓扑图内部状态管理
 * @FilePath: \x6topology\src\components\X6topology\store\index.js
 * @Date: 2022-01-06 10:45:20
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 16:41:49
 * @author: Lin_kangjing
 */

import Vue from "vue";
export const state = Vue.observable({
  // 拓扑图对象
  g: null,
  // 单元（节点或边
  cell: null,

  // 操作
  canUndo: false,
  canRedo: false,
  canCopy: false,
  canPaste: false,
  canDel: false,
  canFit: true,
  canZoom: true,
  canToFront: false,
  canToBack: false,
  canMultiSelect: true,
  canInGroup: false,
  canUnGroup: false,
});
export const mutations = {
  // 设置Graph 实例
  setGraph(graph) {
    state.g = graph;
    this.initOperation();
  },
  // 设置cell(node,edge)值
  setCell(cell) {
    state.cell = cell;
  },
  setCanOpt(type, can) {
    state[type] = can;
  },
  // 初始化操作
  initOperation() {
    this.setCanOpt("canPaste", !state.g.isClipboardEmpty());
    // 历史记录栈记录长度变更
    state.g.history.on("change", () => {
      this.setCanOpt("canUndo", state.g.history.canUndo());
      this.setCanOpt("canRedo", state.g.history.canRedo());
    });
    // 选中的节点/边发生改变(增删)时触发。
    state.g.on("selection:changed", ({ selected }) => {
      // selected 被选中的节点/边
      this.setCanOpt("canCopy", !!selected.length);
      this.setCanOpt("canDel", !!selected.length);
      this.setCanOpt("canToFront", !!selected.length);
      this.setCanOpt("canToBack", !!selected.length);
      this.setCanOpt("canInGroup", !!selected.length);
      // 如果节点的shape==='group'则可以解组
      let canUnGroup = false;
      selected.forEach((cell) => {
        if (cell.shape === "group") {
          canUnGroup = true;
        }
      });
      this.setCanOpt("canUnGroup", canUnGroup);
    });
    // 点击空白画布触发
    state.g.on("blank:click", () => {
      this.setCanOpt("canMultiSelect", true);
      state.g.setRubberbandModifiers("ctrl");
    });
    // 监听分组折叠执行操作
    state.g.on("node:collapse", ({ node }) => {
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const collapse = (parent) => {
        const cells = parent.getChildren();
        if (cells) {
          cells.forEach((cell) => {
            if (collapsed) {
              cell.hide();
            } else {
              cell.show();
            }
            if (cell.shape === "group") {
              if (!cell.isCollapsed()) {
                collapse(cell);
              }
            }
          });
        }
      };
      collapse(node);
    });
  },
  // 撤销
  undo() {
    state.g.history.undo();
  },
  // 重做
  redo() {
    state.g.history.redo();
  },
  // 复制
  copy(cells) {
    cells = cells || state.g.getSelectedCells();
    if (cells.length) {
      state.g.copy(cells);
      this.setCanOpt("canPaste", !state.g.isClipboardEmpty());
    }
  },
  // 粘贴
  paste() {
    if (!state.g.isClipboardEmpty()) {
      const cells = state.g.paste({ offset: 32 });
      state.g.cleanSelection();
      state.g.select(cells);
    }
  },
  // 删除
  del() {
    const cells = state.g.getSelectedCells();
    if (cells.length) {
      state.g.removeCells(cells);
    }
  },
  // 适应画布
  fit() {
    state.g.zoomToFit();
  },
  // 缩放画布成正常大小
  zoom() {
    state.g.zoom(1, {
      absolute: true,
    });
  },
  // 将画布内容中心与视口中心对齐
  centerContent() {
    state.g.centerContent();
  },
  // 将节点/边移到最顶层。
  toFront() {
    const cells = state.g.getSelectedCells();
    if (cells.length) {
      cells.forEach((cell) => {
        cell.toFront();
      });
    }
  },
  // 将节点/边移到最底层。
  toBack() {
    const cells = state.g.getSelectedCells();
    if (cells.length) {
      cells.forEach((cell) => {
        cell.toBack();
      });
    }
  },
  // 开启鼠标左键多选
  multiSelect() {
    state.g.setRubberbandModifiers(null);
    this.setCanOpt("canMultiSelect", false);
  },
  // 成组
  inGroup() {
    const cells = state.g.getSelectedCells();
    if (cells.length) {
      const group = state.g.addNode({
        shape: "group",
      });

      // 把节点添加到分组
      cells.forEach((cell) => {
        group.addChild(cell);
      });
      group.fit({ padding: 30 });
    }
  },
  // 解组
  unGroup() {
    const cells = state.g.getSelectedCells();
    if (cells.length) {
      cells.forEach((group) => {
        if (group.shape === "group") {
          group.children &&
            group.children.forEach((cell) => {
              group.unembed(cell);
            });
          state.g.removeNode(group);
        }
      });
    }
  },
};
