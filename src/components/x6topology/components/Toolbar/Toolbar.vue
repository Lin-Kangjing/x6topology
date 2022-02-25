<!--
 * @Description: 工具栏
 * @FilePath: \x6topology\src\components\X6topology\components\Toolbar\Toolbar.vue
 * @Date: 2022-01-05 09:55:08
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-18 16:07:52
 * @author: Lin_kangjing
-->
<template>
  <div class="toolbar theme">
    <link
      rel="stylesheet"
      type="text/css"
      href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css"
    />
    <el-button size="mini" :disabled="!canUndo" title="撤销" @click="undo">
      <svg-icon name="back"></svg-icon>
    </el-button>
    <el-button size="mini" :disabled="!canRedo" title="重做" @click="redo">
      <svg-icon name="next"></svg-icon>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button size="mini" :disabled="!canCopy" title="复制" @click="copy">
      <svg-icon name="copy"></svg-icon>
    </el-button>
    <el-button size="mini" title="粘贴" :disabled="!canPaste" @click="paste">
      <svg-icon name="intersection"></svg-icon>
    </el-button>
    <el-button size="mini" title="删除" :disabled="!canDel" @click="del">
      <svg-icon name="delete"></svg-icon>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <!-- <el-button size="mini">
      <svg-icon name="next"></svg-icon>
    </el-button>
    <el-button size="mini">
     <svg-icon name="next"></svg-icon>
    </el-button> -->
    <el-button size="mini" title="适应画布" :disabled="!canFit" @click="fit">
      <svg-icon name="auto-width-one"></svg-icon>
    </el-button>
    <el-button size="mini" title="实际尺寸" :disabled="!canZoom" @click="zoom">
      <svg-icon name="auto-line-height"></svg-icon>
    </el-button>
    <el-button
      size="mini"
      title="将画布内容中心与视口中心对齐"
      @click="centerContent"
    >
      <svg-icon name="alignment-vertical-center"></svg-icon>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button
      size="mini"
      title="层级前置"
      :disabled="!canToFront"
      @click="toFront"
    >
      <svg-icon name="bring-to-front"></svg-icon>
    </el-button>
    <el-button
      size="mini"
      title="层级后置"
      :disabled="!canToBack"
      @click="toBack"
    >
      <svg-icon name="sent-to-back"></svg-icon>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button
      size="mini"
      title="鼠标左键多选（ctrl+鼠标左键可以快捷多选）"
      :disabled="!canMultiSelect"
      @click="multiSelect"
    >
      <svg-icon name="checkbox"></svg-icon>
    </el-button>
    <el-button
      size="mini"
      title="成组"
      :disabled="!canInGroup"
      @click="inGroup"
    >
      <svg-icon name="group"></svg-icon>
    </el-button>
    <el-button
      size="mini"
      title="解组"
      :disabled="!canUnGroup"
      @click="unGroup"
    >
      <svg-icon name="ungroup"></svg-icon>
    </el-button>
    <!-- <el-button @click="consoleData" type="primary">控制台输出数据</el-button> -->
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { state } from "../../store";
export default {
  components: {},
  data() {
    return {
      canUndo: false,
      canRedo: false,
      canCopy: false,
      canPaste: true,
      canDel: false,
      canFit: true,
      canZoom: true,
      canToFront: false,
      canToBack: false,
      canMultiSelect: true,
      canInGroup: false,
      canUnGroup: false,
    };
  },
  created() {},
  mounted() {
    bus.$on("init", this.init);
    this.$on("hook:beforeDestroy", () => {
      bus.$off("init");
    });
  },
  methods: {
    init() {
      // 历史记录栈记录长度变更
      state.g.history.on("change", () => {
        this.canUndo = state.g.history.canUndo();
        this.canRedo = state.g.history.canRedo();
      });
      // 选中的节点/边发生改变(增删)时触发。
      state.g.on("selection:changed", ({ selected }) => {
        // selected 被选中的节点/边
        if (selected.length > 0) {
          this.canCopy = true;
          this.canDel = true;
          this.canToFront = true;
          this.canToBack = true;
          this.canInGroup = true;
        } else {
          this.canCopy = false;
          this.canDel = false;
          this.canToFront = false;
          this.canToBack = false;
          this.canInGroup = false;
        }
        // 如果节点的shape==='group'则可以解组
        let canUnGroup = false;
        selected.forEach((cell) => {
          if (cell.shape === "group") {
            canUnGroup = true;
          }
        });
        this.canUnGroup = canUnGroup;
      });
      // 点击空白画布触发
      state.g.on("blank:click", () => {
        this.canMultiSelect = true;
        state.g.setRubberbandModifiers("ctrl");
      });
      // 分组折叠
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
    copy() {
      const cells = state.g.getSelectedCells();
      if (cells.length) {
        state.g.copy(cells);
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
      console.log(state.g.zoom());
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
      this.canMultiSelect = false;
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
  },
};
</script>
<style>
/* 主题 */
/* .grey-theme .toolbar {
  border: none !important;
  box-shadow: none !important;
}
.grey-theme .toolbar .el-button {
  background-color: #f5f5f5 !important;
  border-color: #f5f5f5 !important;
}
.grey-theme .toolbar .el-button:hover {
  background-color: #ededed !important;
} */
</style>

<style scoped>
.toolbar {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 40px;
  width: 100%;
  /* border: 1px solid #e9e9e9;
  border-bottom: 0;
  box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04); */
}
.toolbar .el-button {
  margin: 4px 4px 5px 0;
  padding: 5px 8px;
  border-color: #fff;
}
</style>
