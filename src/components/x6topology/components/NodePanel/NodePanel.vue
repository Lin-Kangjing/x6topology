<!--
 * @Description: 节点面板
 * @FilePath: \x6topology\src\components\x6topology\components\NodePanel\NodePanel.vue
 * @Date: 2022-01-06 09:10:27
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-18 09:20:27
 * @author: Lin_kangjing
-->
<template>
  <div ref="NodePanel" class="NodePanel"></div>
</template>

<script>
import bus from "../../utils/bus";
import { state } from "../../store";
import { Addon, Shape } from "@antv/x6";
import { TextBox } from "../../common";
const { Stencil } = Addon;
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    bus.$on("init", this.init);
    this.$on("hook:beforeDestroy", () => {
      bus.$off("init");
    });
  },
  methods: {
    // 初始化节点面板
    init() {
      const stencil = new Stencil({
        title: "拓扑对象",
        target: state.g,
        search(cell, keyword) {
          return cell.shape.includes(keyword);
        },
        placeholder: "Search by shape name",
        notFoundText: "暂无数据",
        collapsable: true,
        stencilGraphWidth: 230,
        layoutOptions: {
          resizeToFit: true,
        },
        groups: [
          {
            name: "node",
            title: "节点",
            graphHeight: 180,
          },
          {
            name: "shape",
            title: "形状",
            graphHeight: 250,
          },
        ],
      });
      this.$refs.NodePanel.appendChild(stencil.container);
      // 加载侧边栏的项
      this.loadStencilItem(stencil);
    },
    // 加载项
    loadStencilItem(stencil) {
      const rect = new Shape.Rect({
        width: 70,
        height: 40,
        label: "正方形",
      });
      const circle = new Shape.Circle({
        width: 60,
        height: 60,
        label: "园型",
      });
      const ellipse = new Shape.Ellipse({
        width: 80,
        height: 50,
        label: "椭圆形",
      });
      const polygon = new Shape.Polygon({
        width: 70,
        height: 70,
        points: "0,10 10,0 20,10 10,20",
        label: "菱形",
      });
      const textBox = new TextBox({
        width: 80,
        height: 30,
        label: "文本节点",
      });

      stencil.load([rect, circle, polygon, ellipse, textBox], "shape");
    },
  },
};
</script>

<style scoped>
.NodePanel {
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
/* .NodePanel /deep/ .x6-widget-stencil {
  background: #fff;
}
.NodePanel /deep/ .x6-widget-stencil-title,
.NodePanel /deep/ .x6-widget-stencil-group > .x6-widget-stencil-group-title {
  background: #fff;
  border-bottom: 1px solid #ededed;
} */
</style>
