<!--
 * @Description: 拓扑图插件
 * @FilePath: \x6topology\src\components\x6topology\Index.vue
 * @Date: 2021-12-29 09:10:16
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-20 09:11:05
 * @author: Lin_kangjing
-->
<template>
  <div class="topology grey-theme">
    <div id="header"><Toolbar></Toolbar></div>

    <div id="container">
      <div id="left"><NodePanel></NodePanel></div>
      <div id="center">
        <CanvasPanel></CanvasPanel>
      </div>
      <div id="right"><DetailsPanel></DetailsPanel></div>
    </div>
  </div>
</template>

<script>
// 注册节点
import("./common/index");
export default {
  components: {
    Toolbar: () => import("./components/Toolbar/Toolbar.vue"),
    NodePanel: () => import("./components/NodePanel/NodePanel.vue"),
    DetailsPanel: () => import("./components/DetailsPanel/DetailsPanel.vue"),
    CanvasPanel: () => import("./components/CanvasPanel/CanvasPanel.vue"),
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style>
.iconpark-icon {
  width: 1em;
  height: 1em;
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
  height: 100%;
  text-align: left;
}
#container {
  display: flex;
  height: 100%;
}
#center {
  flex: 1 1 100%;
}
#left,
#right {
  flex: 0 0 230px;
}

/* 
.el-aside {
  border: 1px solid #e9e9e9;
  border-right: 0;
  box-shadow: 8px 0px 12px 0px rgba(0, 52, 107, 0.04);
  border-top: 0;
}
.details-panel-wrapper {
  overflow: auto;
  box-sizing: border-box;
  border: 1px solid #e9e9e9;
  box-shadow: -8px 0px 12px 0px rgba(0, 52, 107, 0.04);
  border-top: 0;
} */
</style>
