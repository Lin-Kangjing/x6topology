<!--
 * @Description: 拓扑图插件
 * @FilePath: \x6topology\src\components\X6topology\Index.vue
 * @Date: 2021-12-29 09:10:16
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 17:09:06
 * @author: Lin_kangjing
-->
<template>
  <!-- grey-theme -->
  <div class="topology">
    <div id="header"><Toolbar></Toolbar></div>
    <div id="container">
      <div id="left">
        <!-- <NodePanel></NodePanel> -->
        <EquipmentListPanel></EquipmentListPanel>
      </div>
      <div id="center">
        <CanvasPanel ref="CanvasPanel"></CanvasPanel>
        <!-- 右键菜单 -->
        <ContextMenu></ContextMenu>
      </div>
      <div id="right"><DetailsPanel></DetailsPanel></div>
    </div>
  </div>
</template>

<script>
// 注册图标
import("./utils/svgIcon");
// 注册节点
import("./common/index");
export default {
  components: {
    Toolbar: () => import("./components/Toolbar/Toolbar"),
    // NodePanel: () => import("./components/NodePanel/NodePanel"),
    EquipmentListPanel: () =>
      import("./components/NodePanel/EquipmentListPanel"),
    CanvasPanel: () => import("./components/CanvasPanel/CanvasPanel"),
    ContextMenu: () => import("./components/ContextMenu/ContextMenu"),
    DetailsPanel: () => import("./components/DetailsPanel/DetailsPanel"),
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    init() {
      this.$nextTick(() => {
        this.$refs.CanvasPanel.init();
      });
    },
  },
};
</script>

<style>
.iconpark-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
/* 灰色主题 */
.grey-theme .theme {
  background: #f5f5f5;
  color: #333;
}
.grey-theme .title-bar {
  background-color: #ededed;
}
</style>
<style scoped>
/* 主题 */
.grey-theme .details-panel-wrapper {
  border: none;
}
.grey-theme .el-aside {
  border: none;
}

/* 正常css设置 */
.topology {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  text-align: left;
  border: 1px solid #eee;
}
#header {
  position: relative;
  z-index: 1;
  height: 40px;
  box-shadow: 0 2px 4px #dad7d7;
}
#container {
  flex: 1;
  overflow-x: hidden;
  display: flex;
}
#center {
  flex: 1 1 100%;
}

#left,
#right {
  flex: 0 0 230px;
  /* box-shadow: 0 2px 4px #dad7d7; */
}
#left {
  border-right: 1px solid #ddd;
}
#right {
  border-left: 1px solid #ddd;
}
</style>
