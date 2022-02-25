<!--
 * @Description: 
 * @FilePath: \x6topology\src\views\Home.vue
 * @Date: 2021-12-28 17:30:47
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-02-16 15:32:36
 * @author: Lin_kangjing
-->
<template>
  <div class="home">
    <X6topology></X6topology>
  </div>
</template>

<script>
import X6topology from "../components/X6topology/Index";
export default {
  name: "Home",
  components: { X6topology },
  mounted() {},
};
</script>
<style scoped>
.home {
  box-sizing: border-box;
  height: 100%;
  padding: 40px;
  text-align: left;
}
</style>
