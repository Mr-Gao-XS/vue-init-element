<template>
  <div id="layout-menu">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        v-for="(item, index) in routes"
        :index="index.toString()"
        :key="index"
        @click="NavTo(item.path)"
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: 'layout-menu',
  components: {},
  data() {
    return {
      routes: routes.filter((x) => x.name == 'index')[0].children,
    }
  },
  methods: {
    NavTo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss" scoped>
#layout-menu {
  .el-menu {
    border-right: 0;
  }
}
</style>
