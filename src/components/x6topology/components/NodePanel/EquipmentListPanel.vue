<!--
 * @Description: 左侧的节点面板（这个面板是针对自定义拓扑图的），拖拽到canvas 画布上
 * @FilePath: \x6topology\src\components\X6topology\components\NodePanel\EquipmentListPanel.vue
 * @Date: 2022-02-16 11:35:35
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 17:04:50
 * @author: Lin_kangjing
-->
<template>
  <div ref="EquipmentListPanel" class="equipment-list-panel theme">
    <div class="dnd-wrap">
      <div class="search-wrap">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="small"
          v-model="search"
        >
        </el-input>
      </div>

      <el-collapse v-model="collapseActive" accordion>
        <el-collapse-item title="资源资产" name="1">
          <div class="node-wrap">
            <div
              v-for="item in assetsList"
              :key="item.name"
              class="node-item"
              @mousedown="startDrag($event, item)"
            >
              <img :src="item.img" :alt="item.name" class="node-img" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图形" name="2">
          <el-row :gutter="10" class="node-wrap">
            <el-col
              v-for="item in generalShape"
              :key="item.label"
              class="shape-wrap"
              :span="12"
              @mousedown.native="startDrag($event, item, 'shape')"
            >
              <img :src="item.img" :alt="item.name" class="shape-img" />
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <!-- <div data-type="rect" class="dnd-rect" @MouseDown="startDrag">Rect</div>
      <div data-type="circle" class="dnd-circle" @MouseDown="startDrag">
        Circle
      </div> -->
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { state } from "../../store";
import { Addon } from "@antv/x6";
// import { TextBox } from "../../common";
const { Dnd } = Addon;
let dndInstance = null;
export default {
  components: {},
  data() {
    return {
      dnd: null,
      collapseActive: "1",
      search: "",
      // 资源资产
      assetsList: Object.freeze([
        {
          name: "网络打印机",
          img: require("./nodeSvg/earth.svg"),
          type: 0,
          data: { id: 1 },
        },
        {
          name: "服务器打印机",
          img: require("./nodeSvg/server.svg"),
          type: 1,
          data: { id: 1 },
        },
        {
          name: "存储2打印机",
          img: require("./nodeSvg/save-one.svg"),
          type: 1,
          data: { id: 1 },
        },
      ]),
      // 一般形状
      generalShape: Object.freeze([
        {
          name: "矩形",
          shape: "rect",
          img: require("./nodeSvg/rectangle-one.svg"),
        },
        {
          name: "圆形",
          shape: "circle",
          img: require("./nodeSvg/round.svg"),
        },
        {
          name: "菱形",
          shape: "polygon",
          img: require("./nodeSvg/diamond-three.svg"),
        },
        {
          name: "椭圆形",
          shape: "ellipse",
          img: require("./nodeSvg/oval-one.svg"),
        },
        {
          name: "文本",
          shape: "text-box",
          img: require("./nodeSvg/text-style-one.svg"),
        },
      ]),
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
    // 初始化节点面板
    init() {
      dndInstance = new Dnd({
        target: state.g,
        scaled: false,
        animation: true,
      });
    },
    // 创建节点
    createNode(item) {
      const shape = item.shape;
      switch (shape) {
        case "rect":
          return state.g.createNode({
            shape: "rect",
            width: 70,
            height: 40,
            label: item.name,
          });
        case "circle":
          return state.g.createNode({
            shape: "circle",
            width: 60,
            height: 60,
            label: item.name,
          });
        case "ellipse":
          return state.g.createNode({
            shape: "ellipse",
            width: 80,
            height: 50,
            label: item.name,
          });
        case "polygon":
          return state.g.createNode({
            shape: "polygon",
            width: 70,
            height: 70,
            points: "0,10 10,0 20,10 10,20",
            label: item.name,
          });
        case "text-box":
          return state.g.createNode({
            shape: "text-box",
            width: 80,
            height: 30,
            points: "0,10 10,0 20,10 10,20",
            label: item.name,
          });
        default:
          return state.g.createNode({
            shape: "image",
            width: 40,
            height: 40,
            imageUrl: item.img,
            label: item.name,
            attrs: {
              label: {
                refY: "100%",
                refY2: 10,
              },
            },
            data: item,
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
      }
    },
    // 开始拖拽
    startDrag(e, item) {
      const node = this.createNode(item);
      dndInstance.start(node, e);
    },
  },
};
</script>

<style scoped>
.dnd-wrap {
  padding: 0 12px;
}
.search-wrap {
  padding: 12px 0;
}
.dnd-wrap /deep/ .el-collapse-item__header {
  height: 40px;
  line-height: 40px;
}
.node-wrap {
  margin-top: 5px;
}
.node-item {
  display: flex;
  align-items: center;
  /* margin-top: 15px; */
  height: 30px;
  overflow: hidden;
  cursor: move;
}
.node-img {
  width: 25px;
  height: 53%;
  margin-right: 5px;
}
.shape-wrap {
  text-align: center;
  cursor: move;
}
.shape-img {
  height: 50px;
}
</style>
