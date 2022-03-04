<!--
 * @Description: 画布面板
 * @FilePath: \x6topology\src\components\X6topology\components\CanvasPanel\CanvasPanel.vue
 * @Date: 2022-01-06 09:27:50
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-04 15:58:33
 * @author: Lin_kangjing
-->
<template>
  <div :id="el" class="x6topology"></div>
</template>

<script>
import bus from "../../utils/bus";
import keyboard from "../../utils/keyboard";
import { mutations, state } from "../../store";
import { Graph } from "@antv/x6";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    el() {
      return state.el;
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const el = document.getElementById(this.el);
      const minimapEl = document.getElementById("minimap");
      const g = new Graph({
        container: el,
        snap: true, //连线吸附
        // 配置全局的连线规则
        connecting: {
          snap: true, //连线吸附
          allowBlank: false, //允许连接到空白地方
        },

        grid: true,
        background: {
          color: "#f4f4f4",
        },
        // 画布是否可以拖动
        panning: {
          enabled: true,
          // modifiers: "shift",
        },
        // 对齐线
        snapline: {
          enabled: true,
          sharp: true,
        },
        // 调整节点大小
        resizing: {
          enabled: true,
        },
        // 旋转节点
        rotating: {
          enabled: true,
        },
        // 鼠标滚轮动作
        mousewheel: {
          enabled: true,
          minScale: 0.2,
          maxScale: 3,
        },
        // 键盘快捷键
        keyboard: true,
        // 节点选择
        selecting: {
          enabled: true,
          multiple: true,
          rubberband: true,
          modifiers: "ctrl",
          showNodeSelectionBox: true,
        },
        // 剪切板
        clipboard: {
          enabled: true,
        },
        // 历史（undo,redo
        history: true,
        // 小地图
        minimap: {
          enabled: true,
          container: minimapEl,
          width: 230,
          height: 170,
          scalable: false,
        },
        // 画布滚动
        // scroller: {
        //   enabled: true,
        //   pannable: true,
        //   autoResize: true,
        // },
      });
      // 设置graph 到state上面
      mutations.setGraph(Object.freeze(g));
      // 绑定键盘快捷键
      keyboard(g);
      // 开启双击文本节点编辑
      this.textNodeEdit();
      // 广播初始化完成
      bus.$emit("init");

      const w = g.addNode({
        shape: "image",
        x: 140,
        y: 140,
        width: 40,
        height: 40,
        imageUrl: require("../NodePanel/nodeSvg/earth.svg"),
        label: "网络",
        attrs: {
          label: {
            refY: "100%",
            refY2: 10,
          },
        },
        data: null,
        ports: {
          groups: {
            simple: {
              position: {
                name: "ellipseSpread",
                args: { dr: 5 },
              },
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
          },
          items: [
            {
              id: "simple1",
              group: "simple",
            },
            {
              id: "simple2",
              group: "simple",
            },
            {
              id: "simple3",
              group: "simple",
            },
            {
              id: "simple4",
              group: "simple",
            },
          ],
        },
      });
      const s = g.addNode({
        shape: "image",
        x: 340,
        y: 340,
        width: 40,
        height: 40,
        imageUrl: require("../NodePanel/nodeSvg/earth.svg"),
        label: "网络",
        attrs: {
          label: {
            refY: "100%",
            refY2: 10,
          },
        },
        data: null,
        ports: {
          groups: {
            simple: {
              position: {
                name: "ellipseSpread",
                args: { dr: 5 },
              },
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 1,
                  fill: "#fff",
                },
              },
            },
          },
          items: [
            {
              id: "simple1",
              group: "simple",
            },
            {
              id: "simple2",
              group: "simple",
            },
            {
              id: "simple3",
              group: "simple",
            },
            {
              id: "simple4",
              group: "simple",
            },
          ],
        },
      });
      g.addEdge({
        source: w,
        target: s,
      });
    },
    // 开启双击文本节点编辑
    textNodeEdit() {
      state.g.on("node:dblclick", ({ cell, e }) => {
        cell.shape === "text-block" &&
          cell.addTools({
            name: "node-editor",
            args: {
              event: e,
              setText: ({ cell, value }) => {
                cell.setAttrs({ label: { text: value } });
              },
            },
          });
      });
    },
  },
};
</script>

<style scoped>
.x6topology {
  height: 100%;
}
</style>
