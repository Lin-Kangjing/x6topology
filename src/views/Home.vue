<!--
 * @Description: 
 * @FilePath: \x6topology\src\views\Home.vue
 * @Date: 2021-12-28 17:30:47
 * @LastEditors: Lin_kangjing
 * @LastEditTime: 2022-01-12 10:21:45
 * @author: Lin_kangjing
-->
<template>
  <div class="home">
    <x6topology></x6topology>
  </div>
</template>

<script>
import x6topology from "../components/x6topology/Index";
export default {
  name: "Home",
  components: { x6topology },
  mounted() {},
};
</script>
<style scoped>
.home {
  box-sizing: border-box;
  height: 95vh;
  padding: 30px;
  text-align: left;
}
</style>
