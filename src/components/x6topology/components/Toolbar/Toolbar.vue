<!--
 * @Description: 工具栏
 * @FilePath: \x6topology\src\components\X6topology\components\Toolbar\Toolbar.vue
 * @Date: 2022-01-05 09:55:08
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 17:01:59
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
      <svg class="iconpark-icon"><use href="#back"></use></svg>
    </el-button>
    <el-button size="mini" :disabled="!canRedo" title="恢复" @click="redo">
      <svg class="iconpark-icon"><use href="#next"></use></svg>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button size="mini" :disabled="!canCopy" title="复制" @click="copy">
      <svg class="iconpark-icon"><use href="#copy"></use></svg>
    </el-button>
    <el-button size="mini" title="粘贴" :disabled="!canPaste" @click="paste">
      <svg class="iconpark-icon"><use href="#intersection"></use></svg>
    </el-button>
    <el-button size="mini" title="删除" :disabled="!canDel" @click="del">
      <svg class="iconpark-icon"><use href="#delete"></use></svg>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button size="mini" title="适应画布" :disabled="!canFit" @click="fit">
      <svg class="iconpark-icon"><use href="#auto-width-one"></use></svg>
    </el-button>
    <el-button size="mini" title="实际尺寸" :disabled="!canZoom" @click="zoom">
      <svg class="iconpark-icon"><use href="#auto-line-height"></use></svg>
    </el-button>
    <el-button
      size="mini"
      title="将画布内容中心与视口中心对齐"
      @click="centerContent"
    >
      <svg class="iconpark-icon">
        <use href="#alignment-vertical-center"></use>
      </svg>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button
      size="mini"
      title="层级前置"
      :disabled="!canToFront"
      @click="toFront"
    >
      <svg class="iconpark-icon"><use href="#bring-to-front"></use></svg>
    </el-button>
    <el-button
      size="mini"
      title="层级后置"
      :disabled="!canToBack"
      @click="toBack"
    >
      <svg class="iconpark-icon"><use href="#sent-to-back"></use></svg>
    </el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button
      size="mini"
      title="鼠标左键多选（ctrl+鼠标左键可以快捷多选）"
      :disabled="!canMultiSelect"
      @click="multiSelect"
    >
      <svg class="iconpark-icon"><use href="#checkbox"></use></svg>
    </el-button>
    <el-button
      size="mini"
      title="成组"
      :disabled="!canInGroup"
      @click="inGroup"
    >
      <svg class="iconpark-icon"><use href="#group"></use></svg>
    </el-button>
    <el-button
      size="mini"
      title="解组"
      :disabled="!canUnGroup"
      @click="unGroup"
    >
      <svg class="iconpark-icon"><use href="#ungroup"></use></svg>
    </el-button>
    <!-- <el-button @click="consoleData" type="primary">控制台输出数据</el-button> -->
  </div>
</template>

<script>
import { state, mutations } from "../../store";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    canUndo() {
      return state.canUndo;
    },
    canRedo() {
      return state.canRedo;
    },
    canCopy() {
      return state.canCopy;
    },
    canPaste() {
      return state.canPaste;
    },
    canDel() {
      return state.canDel;
    },
    canFit() {
      return state.canFit;
    },
    canZoom() {
      return state.canZoom;
    },
    canToFront() {
      return state.canToFront;
    },
    canToBack() {
      return state.canToBack;
    },
    canMultiSelect() {
      return state.canMultiSelect;
    },
    canInGroup() {
      return state.canInGroup;
    },
    canUnGroup() {
      return state.canUnGroup;
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 撤销
    undo: mutations.undo,
    // 重做
    redo: mutations.redo,
    // 复制
    copy: mutations.copy,
    // 粘贴
    paste: mutations.paste,
    // 删除
    del: mutations.del,
    // 适应画布
    fit: mutations.fit,
    // 缩放画布成正常大小
    zoom: mutations.zoom,
    // 将画布内容中心与视口中心对齐
    centerContent: mutations.centerContent,
    // 将节点/边移到最顶层。
    toFront: mutations.toFront,
    // 将节点/边移到最底层。
    toBack: mutations.toBack,
    // 开启鼠标左键多选
    multiSelect: mutations.multiSelect,
    // 成组
    inGroup: mutations.inGroup,
    // 解组
    unGroup: mutations.unGroup,
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
