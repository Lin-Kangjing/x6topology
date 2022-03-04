<!--
 * @Description: 右键菜单
 * @FilePath: \x6topology\src\components\X6topology\components\ContextMenu\ContextMenu.vue
 * @Date: 2022-02-28 11:13:35
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-03-04 16:15:14
 * @author: Lin_kangjing
-->
<template>
  <div class="ContextMenu">
    <Contextmenu ref="Contextmenu">
      <Contextmenu-item>菜单1</Contextmenu-item>
      <Contextmenu-item>菜单2</Contextmenu-item>
      <Contextmenu-item>菜单3</Contextmenu-item>

      <Contextmenu-submenu title="子菜单">
        <Contextmenu-item>菜单4</Contextmenu-item>

        <Contextmenu-item divider></Contextmenu-item>

        <Contextmenu-submenu title="子菜单">
          <Contextmenu-item>菜单5</Contextmenu-item>
        </Contextmenu-submenu>
      </Contextmenu-submenu>
    </Contextmenu>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import { state } from "../../store";
import {
  directive,
  Contextmenu,
  ContextmenuItem,
  ContextmenuSubmenu,
  // ContextmenuGroup,
} from "v-contextmenu";

import * as a from "v-contextmenu";
console.log(a);
export default {
  components: {
    Contextmenu,
    ContextmenuItem,
    ContextmenuSubmenu,
    // ContextmenuGroup,
  },
  directives: {
    contextmenu: directive,
  },
  data() {
    return {
      isShow: false,
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
      state.g.on("cell:contextmenu", ({ e }) => {
        console.log(123);
        console.log(e);
        // const target = document
        //   .getElementById(state.el)
        //   .getBoundingClientRect();
        // const postition = {
        //   top: Math.random() * target.height + target.top,
        //   left: Math.random() * target.width + target.left,
        // };
        console.log(this.$refs.Contextmenu);
        this.$refs.Contextmenu.show();
      });
    },
  },
};
</script>

<style scoped></style>
