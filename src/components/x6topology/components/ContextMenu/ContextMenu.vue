<!--
 * @Description: 右键菜单
 * @FilePath: \x6topology\src\components\X6topology\components\ContextMenu\ContextMenu.vue
 * @Date: 2022-02-28 11:13:35
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-08 16:45:28
 * @author: Lin_kangjing
-->
<template>
  <div class="ContextMenu">
    <Contextmenu ref="Contextmenu" autoPlacement @hide="hideHandler">
      <template v-for="item in menus">
        <Contextmenu-item
          v-if="item.divider"
          :key="item.name + 1"
          divider
        ></Contextmenu-item>
        <Contextmenu-item
          :key="item.name"
          :disabled="!disabled(item.opt)"
          @click="(vm, e) => clickHandler(vm, e, item.opt)"
          >{{ item.name }}</Contextmenu-item
        >
      </template>
    </Contextmenu>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { state, mutations } from "../../store";
import {
  Contextmenu,
  ContextmenuItem,
  // ContextmenuSubmenu,
  // ContextmenuGroup,
} from "v-contextmenu";
import "v-contextmenu/dist/index.css";

export default {
  components: {
    Contextmenu,
    ContextmenuItem,
    // ContextmenuSubmenu,
    // ContextmenuGroup,
  },
  data() {
    return {
      menus: Object.freeze([
        { name: "层级前置", opt: "toFront", divider: false },
        { name: "层级后置", opt: "toBack", divider: false },
        { name: "删除", opt: "del", divider: true },
        { name: "撤销", opt: "undo", divider: true },
        { name: "恢复", opt: "redo", divider: false },
        { name: "复制", opt: "copy", divider: true },
        { name: "粘贴", opt: "paste", divider: false },
      ]),
      cell: null,
    };
  },
  computed: {
    // 是否可以操作
    disabled() {
      return (opt) => {
        if (["undo", "redo", "paste"].includes(opt)) {
          opt = opt.slice(0, 1).toUpperCase() + opt.slice(1);
          return state[`can${opt}`];
        } else {
          return true;
        }
      };
    },
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
      // eslint-disable-next-line no-unused-vars
      state.g.on("cell:contextmenu", ({ e, x, y, cell }) => {
        const postition = {
          top: e.pageY,
          left: e.pageX,
        };
        this.$refs.Contextmenu.show(postition);
        this.cell = cell;
      });
    },
    hideHandler() {
      // this.cell
    },
    // 菜单点击事件
    clickHandler(vm, e, type) {
      switch (type) {
        case "copy":
          mutations.copy([this.cell]);
          break;
        case "del":
          state.g.removeCells([this.cell]);
          break;
        case "toFront":
          this.cell.toFront();
          break;
        case "toBack":
          this.cell.toBack();
          break;
        default:
          mutations[type]();
      }
    },
  },
};
</script>

<style scoped>
.v-contextmenu-item {
  min-width: 160px;
  line-height: 22px;
}
.v-contextmenu .v-contextmenu-item.v-contextmenu-item--disabled {
  background-color: inherit;
}
</style>
